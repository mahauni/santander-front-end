import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";
import { ValueByType } from "./useValueByType";

export type ChartData = {
    dates: Record<string, ValueByType>
}

export type TransactionsChart = Record<string, ValueByType>;

export function useTransactionsValueChart(): UseQueryResult<ChartData, Error> {
  return useQuery<ChartData, Error>({
    refetchOnWindowFocus: true,
    queryKey: ["value_per_month"],
    queryFn: async () => {
      const response = await fetch(API_URL + "dashboard/transactions/value-per-month");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
