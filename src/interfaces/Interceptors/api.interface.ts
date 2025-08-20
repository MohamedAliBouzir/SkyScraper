import type { API_ENDPOINTS } from "../../services/api";

export interface IServerStatus {
  status: boolean;
  message: string;
}

export interface IUseTestServerReturn {
  data: IServerStatus | undefined;
  isLoading: boolean;
  error: Error | undefined;
  isError: boolean;
  refetch: () => void;
}

export interface TUseApiSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  data: T;
  isLoading: boolean;
  error: Error | undefined;
}

export interface IUseApiSearchOptions {
  endpoint: keyof typeof API_ENDPOINTS;
  enabled?: boolean;
  customParams?: Record<string, any>;
}
