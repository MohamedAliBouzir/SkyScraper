import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_ENDPOINTS, type AirportSearchResponse, type AirportSuggestion } from '../services/api';
import { fetcher } from '../services/api';

interface UseAirportSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  suggestions: AirportSuggestion[];
  isLoading: boolean;
  error: Error | undefined;
}

export const useAirportSearch = (): UseAirportSearchReturn => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce the query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // SWR hook for API call
  const { data, error, isLoading } = useSWR<AirportSearchResponse>(
    debouncedQuery ? `${API_ENDPOINTS.AIRPORT_SEARCH}?query=${encodeURIComponent(debouncedQuery)}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
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