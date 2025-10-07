import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";
import { useTimePeriod } from "./useTimePeriod";

export type ValueByType = {
    boleto: number
    pix: number
    sistemico: number
    ted: number
}

export function useValueByType(): UseQueryResult<ValueByType, Error> {
  const { dateDayjs } = useTimePeriod()

  const params = new URLSearchParams({
    start_date: dateDayjs.startOf('month').format('YYYY-MM-DD'),
    end_date: dateDayjs.endOf('month').format('YYYY-MM-DD'),
  })

  return useQuery<ValueByType, Error>({
    refetchOnWindowFocus: true,
    queryKey: ["value_by_type", dateDayjs.format('YYYY-MM-DD')],
    queryFn: async () => {
      const response = await fetch(API_URL + `dashboard/transactions/type?${params}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
