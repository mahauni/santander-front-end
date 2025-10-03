import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";

export function useMakeAnalysis(node: string): UseQueryResult<any, Error> {
  const params = new URLSearchParams({
    cnpj: node,
  })

  return useQuery<any, Error>({
    enabled: false,
    retry: false, // this makes don't retry till a success
    refetchOnWindowFocus: false,
    queryKey: ["analysis"],
    queryFn: async () => {
      const response = await fetch(API_URL + `analysis/make?${params}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
