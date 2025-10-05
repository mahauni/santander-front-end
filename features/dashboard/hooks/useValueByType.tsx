import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";

export type ValueByType = {
    boleto: number
    pix: number
    sistemico: number
    ted: number
}

export function useValueByType(): UseQueryResult<ValueByType, Error> {
  return useQuery<ValueByType, Error>({
    refetchOnWindowFocus: true,
    queryKey: ["value_by_type"],
    queryFn: async () => {
      const response = await fetch(API_URL + "dashboard/transactions/type");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
