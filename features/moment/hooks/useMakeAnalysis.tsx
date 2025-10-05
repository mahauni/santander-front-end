import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";

export interface Analysis {
    moment: string
    problem: string
    saldo: number[]
    faturamento: number[]
    data: string[]
}

export function useMakeAnalysis(node: string): UseQueryResult<Analysis, Error> {
  const params = new URLSearchParams({
    cnpj: node,
  })

  return useQuery<Analysis, Error>({
    enabled: false,
    retry: false, // this makes don't retry till a success
    refetchOnWindowFocus: false,
    queryKey: ["moment"],
    queryFn: async () => {
      const response = await fetch(API_URL + `company/perfil?${params}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
