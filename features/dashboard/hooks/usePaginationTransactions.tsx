import { useQuery } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";
import { useTimePeriod } from "./useTimePeriod";
import { Pagination } from "../../../types/types";

export type Transaction = {
    id: number
    id_pgto: string
    id_rcbe: string
    vl: string
    ds_tran: string
    dt_refe: string
}

export function usePaginationTransactions(page: number, pageSize: number) {
  const { dateDayjs } = useTimePeriod()

  const params = new URLSearchParams({
    start_date: dateDayjs.startOf('month').format('YYYY-MM-DD'),
    end_date: dateDayjs.endOf('month').format('YYYY-MM-DD'),
    page: page.toString(),
    page_size: pageSize.toString(),
  })

  return useQuery<Pagination<Transaction>, Error>({
    refetchOnWindowFocus: true,
    queryKey: ["transactions", dateDayjs.format('YYYY-MM-DD'), page, pageSize],
    queryFn: async () => {
      const response = await fetch(API_URL + `dashboard/transactions?${params}`);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
