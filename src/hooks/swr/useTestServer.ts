import useSWR from "swr";
import { API_ENDPOINTS, fetcher } from "../../services/api";
import type {
  IServerStatus,
  IUseTestServerReturn,
} from "../../interfaces/Mappers/api.interface";

export const useTestServer = (): IUseTestServerReturn => {
  const { data, error, isLoading, mutate } = useSWR<IServerStatus>(
    API_ENDPOINTS.CHECK_SERVER,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnMount: false,
      dedupingInterval: 60000,
    }
  );

  return {
    data,
    isLoading,
    error,
    isError: !!error,
    refetch: mutate,
  };
};
