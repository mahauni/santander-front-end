import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";

export type Transaction = {
    id: number
    id_pgto: string
    id_rcbe: string
    vl: string
    ds_tran: string
    dt_refe: string
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
      const response = await fetch(API_URL + "dashboard/transactionsss");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  const pix = query.data?.filter((value) => value.ds_tran === "PIX") ?? []
  const boleto = query.data?.filter((value) => value.ds_tran=== "BOLETO") ?? []
  const ted = query.data?.filter((value) => value.ds_tran === "TED") ?? []
  const sistemico = query.data?.filter((value) => value.ds_tran === "SISTEMICO") ?? []


  return {...query, pix, boleto, ted, sistemico }
}
