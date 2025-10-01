import { useQuery, UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";

export type Transaction = {
    id: number
    id_reciever: string
    id_sender: string
    type: string
    value: string
    date: string
}

type TransactionQuery = {
    pix: Transaction[]
    boleto: Transaction[]
    sistemico: Transaction[]
    ted: Transaction[]
} & UseQueryResult<Transaction[], Error>

export function useTransactions(): TransactionQuery {
  const query = useQuery<Transaction[], Error>({
    refetchOnWindowFocus: true,
    queryKey: ["transactions"],
    queryFn: async () => {
      const response = await fetch(API_URL + "dashboard/transactions");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  const pix = query.data?.filter((value) => value.type === "PIX") ?? []
  const boleto = query.data?.filter((value) => value.type === "BOLETO") ?? []
  const ted = query.data?.filter((value) => value.type === "TED") ?? []
  const sistemico = query.data?.filter((value) => value.type === "SISTEMICO") ?? []


  return {...query, pix, boleto, ted, sistemico }
}
