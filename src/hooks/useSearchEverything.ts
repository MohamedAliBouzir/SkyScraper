import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_ENDPOINTS} from '../services/api';
import { fetcher } from '../services/api';
import type { SearchEverythingResponse, SearchSuggestion } from '../interfaces/components-interfaces';

interface UseSearchEverythingReturn {
  query: string;
  setQuery: (query: string) => void;
  suggestions: SearchSuggestion[];
  isLoading: boolean;
  error: Error | undefined;
}

export const useSearchEverything = (): UseSearchEverythingReturn => {
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

  const { data, error, isLoading } = useSWR<SearchEverythingResponse>(
    debouncedQuery.trim() !== '' 
      ? `${API_ENDPOINTS.SEARCH_EVERYTHING}?query=${encodeURIComponent(debouncedQuery)}` 
      : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      dedupingInterval: 30000,
    }
  );

  return {
    query,
    setQuery,
    suggestions: data?.data || [],
    isLoading,
    error,
  };
};