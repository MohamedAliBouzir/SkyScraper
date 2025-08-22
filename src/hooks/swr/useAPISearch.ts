import { useState, useEffect } from "react";
import useSWR from "swr";
import { API_ENDPOINTS, fetcher } from "../../services/api";
import type { TSearchData, TSearchResponse } from "../../types/api-type";
import type {
  IUseApiSearchOptions,
  TUseApiSearchReturn,
} from "../../interfaces/Interceptors/api.interface";

export const useApiSearch = <T extends TSearchData>(
  options: IUseApiSearchOptions
): TUseApiSearchReturn<T> => {
  const { endpoint, enabled = true, customParams } = options;
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const buildUrl = () => {
    if (!enabled) return null;

    const baseUrl = API_ENDPOINTS[endpoint];

    if (endpoint === "NEARBY_AIRPORTS" && customParams) {
      const { lat, lng } = customParams;
      if (lat !== null && lng !== null) {
        return `${baseUrl}?lat=${lat}&lng=${lng}`;
      }
      return null;
    }

    if (debouncedQuery.trim() !== "") {
      return `${baseUrl}?query=${encodeURIComponent(debouncedQuery)}`;
    }

    return null;
  };

  const url = buildUrl();

  const { data, error, isLoading } = useSWR<TSearchResponse>(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    dedupingInterval: 30000,
  });

  let responseData: T;

  if (endpoint === "NEARBY_AIRPORTS") {
    responseData = (data?.data || {
      current: null,
      nearby: [],
      recent: [],
    }) as T;
  } else {
    responseData = (data?.data || []) as T;
  }

  return {
    query,
    setQuery,
    data: responseData,
    isLoading,
    error,
  };
};
