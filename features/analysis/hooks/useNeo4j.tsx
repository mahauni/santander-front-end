import * as neo4j from "neo4j-driver"
import type { Node, Relationship } from '@neo4j-nvl/base'
import { create } from 'zustand';
import { useState } from "react";
import { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } from "../../../utils/neo4j.utils"

interface Neo4jUtils {
    driver: neo4j.Driver | null
    isConnected: boolean
    error: Error | null
    connect: (uri: string, username: string, password: string) => Promise<void>
    disconnect: () => Promise<void>
    runQuery: (cypher: string, params?: Record<string, any>) => Promise<any[]>
}

export const useNeo4jStore = create<Neo4jUtils>()((set, get) => ({
  driver: neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)),
  isConnected: true,
  error: null,

  connect: async (uri, username, password) => {
    try {
      const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));

      set({
        driver: driver,
        isConnected: true, 
        error: null 
      });
    } catch (err) {
      set({ error: err.message, isConnected: false });
    }
  },

  disconnect: async () => {
    const { driver } = get();
    if (driver) {
      await driver.close();
      set({ driver: null, isConnected: false });
    }
  },

  runQuery: async (cypher, params = {}) => {
    const { driver, isConnected } = get();

    if (!isConnected || !driver) {
      throw new Error('Not connected to Neo4j');
    }

    try {
      const session = driver.session();
      const result = await session.run(cypher, params);

      await session.close();

      // return result.records;
      const records = result.records.map(record => {
        const obj: any = {};

        // Get all keys from the record
        record.keys.forEach(key => {
          const value = record.get(key);

          // Handle Neo4j node objects
          if (value && typeof value === 'object' && value.labels) {
            obj[key] = {
              identity: value.identity.toNumber ? value.identity.toNumber() : value.identity,
              elementId: value.elementId,
              labels: value.labels,
              properties: value.properties
            };
          }
          // Handle Neo4j relationship objects
          else if (value && typeof value === 'object' && value.type) {
            obj[key] = {
              identity: value.identity.toNumber ? value.identity.toNumber() : value.identity,
              elementId: value.elementId,
              type: value.type,
              start: value.start.toNumber ? value.start.toNumber() : value.start,
              end: value.end.toNumber ? value.end.toNumber() : value.end,
              startNodeElementId: value.startNodeElementId,
              endNodeElementId: value.endNodeElementId,
              properties: value.properties
            };
          }
          // Handle Neo4j path objects
          else if (value && typeof value === 'object' && value.segments) {
            // For paths, extract nodes and relationships
            obj[key] = {
              start: value.start,
              end: value.end,
              segments: value.segments,
              length: value.length
            };
          }
          // Handle regular values (strings, numbers, arrays, etc.)
          else {
            obj[key] = value;
          }
        });

        return obj as any;
      });

      // Clear any previous errors
      set({ error: null });

      return records;
    } catch (err) {
      set({ error: err.message });
      throw err;
    }
  }
}));

export function useNeo4jQuery(cypher: string, params?: Record<string, any>) {
  const { runQuery } = useNeo4jStore();
  const [data, setData] = useState<{ nodes: Node[]; relationships: Relationship[] }>({
    nodes: [],
    relationships: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);

    try {
      const results = await runQuery(cypher, params);
      const transformed = transformToNvlFormat(results);
      setData(transformed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query failed');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
}

// Transform Neo4j query results to NVL format
export function transformToNvlFormat(records: any[]): { nodes: Node[]; relationships: Relationship[] } {
  const nodesMap = new Map<string, Node>();
  const relationships: Relationship[] = [];

  records.forEach(record => {
    // Extract nodes
    console.log('record', record)
    Object.keys(record).forEach(key => {
      const value = record[key];
      console.log('value', value)

      // Handle node objects
      if (value && typeof value === 'object' && value.labels) {
        const nodeId = String(value.identity);
        if (!nodesMap.has(nodeId)) {
          nodesMap.set(nodeId, {
            id: nodeId,
            caption: `CNPJ_${value.properties?.name || value.properties?.title || nodeId}`,
            size: 10,
            color: undefined,
          } as Node);
        }
      }

      // Handle relationship objects
      if (value && typeof value === 'object' && value.type && value.start && value.end) {
        relationships.push({
          id: String(value.identity),
          from: String(value.start),
          to: String(value.end),
          caption: value.type,
        } as Relationship);
      }
    });
  });

  return {
    nodes: Array.from(nodesMap.values()),
    relationships,
  };
}
