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

export function useTransactions(): UseQueryResult<Transaction[], Error> {
  return useQuery<Transaction[], Error>({
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
}
