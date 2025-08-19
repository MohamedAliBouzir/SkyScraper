import useSWR from 'swr';
import { API_ENDPOINTS, type ServerStatus, fetcher } from '../services/api';

interface UseTestServerReturn {
  data: ServerStatus | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isError: boolean;
  refetch: () => void;
}

export const useTestServer = (): UseTestServerReturn => {
  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<ServerStatus>(
    API_ENDPOINTS.CHECK_SERVER,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      shouldRetryOnError: false,
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