import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_ENDPOINTS, fetcher } from '../../services/api';
import type { 
  IAirportSearchResponse, 
} from '../../interfaces/Interceptors/flight-api.interface';
import type { 
  ICarSearchResponse, 
} from '../../interfaces/Interceptors/cars-api.interface';
import type { 
  ISearchEverythingResponse, 
} from '../../interfaces/Interceptors/everyThing-api.interface';

type SearchResponse = 
  | IAirportSearchResponse 
  | ICarSearchResponse 
  | ISearchEverythingResponse;

type SearchSuggestion = 
  | IAirportSearchResponse['data'][0]
  | ICarSearchResponse['data'][0]
  | ISearchEverythingResponse['data'][0];

interface UseApiSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  suggestions: T[];
  isLoading: boolean;
  error: Error | undefined;
}

interface UseApiSearchOptions {
  endpoint: keyof typeof API_ENDPOINTS;
  enabled?: boolean;
}

export const useApiSearch = <T extends SearchSuggestion>(
  options: UseApiSearchOptions
): UseApiSearchReturn<T> => {
  const { endpoint, enabled = true } = options;
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  const { data, error, isLoading } = useSWR<SearchResponse>(
    enabled && debouncedQuery.trim() !== '' 
      ? `${API_ENDPOINTS[endpoint]}?query=${encodeURIComponent(debouncedQuery)}` 
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      dedupingInterval: 30000,
    }
  );

  const suggestions = (data?.data || []) as T[];

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    error,
  };
};