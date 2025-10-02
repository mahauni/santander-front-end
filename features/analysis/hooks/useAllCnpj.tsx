import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import { API_URL } from "../../../utils/api.utils";

type CnpjList = {
    cnpjs: string[]
}

export function useAllCnpj(): UseQueryResult<CnpjList, Error> {
  return useQuery<CnpjList, Error>({
    queryKey: ["cnpjs"],
    queryFn: async () => {
      const response = await fetch(API_URL + "dashboard/cnpj");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });
}
