import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";
import { ValueByType } from "./useValueByType";
import { useTimePeriod } from "./useTimePeriod";

export type ChartData = {
    dates: Record<string, ValueByType>
}

export type TransactionsChart = Record<string, ValueByType>;

export function useTransactionsValueChart(): UseQueryResult<ChartData, Error> {
  const { dateDayjs } = useTimePeriod()

  const params = new URLSearchParams({
    start_date: dateDayjs.startOf('month').format('YYYY-MM-DD'),
    end_date: dateDayjs.endOf('month').format('YYYY-MM-DD'),
  })

  return useQuery<ChartData, Error>({
    refetchOnWindowFocus: true,
    queryKey: ["value_per_month", dateDayjs.format('YYYY-MM-DD')],
    queryFn: async () => {
      const response = await fetch(API_URL + `dashboard/transactions/value-per-month?${params}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
