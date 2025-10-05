import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";
import { ValueByType } from "./useValueByType";

export type CountData = {
    dates: Record<string, ValueByType>
}

export function useTransactionsCountType(): UseQueryResult<CountData, Error> {
  return useQuery<CountData, Error>({
    refetchOnWindowFocus: true,
    queryKey: ["count_per_month"],
    queryFn: async () => {
      const response = await fetch(API_URL + "dashboard/transactions/count-per-month");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
