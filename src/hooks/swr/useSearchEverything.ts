import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_ENDPOINTS, fetcher } from '../../services/api';
import type { ISearchEverythingResponse, IUseSearchEverythingReturn } from '../../interfaces/Mappers/everyThing-api.interface';

export const useSearchEverything = (): IUseSearchEverythingReturn => {
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

  const { data, error, isLoading } = useSWR<ISearchEverythingResponse>(
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