import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { API_ENDPOINTS, fetcher } from '../../services/api';
import type { IAirportSearchResponse, IUseAirportSearchReturn } from '../../interfaces/Mappers/flight-api.interface';




export const useAirportSearch = (): IUseAirportSearchReturn => {
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

  const { data, error, isLoading } = useSWR<IAirportSearchResponse>(
    debouncedQuery.trim() !== '' 
      ? `${API_ENDPOINTS.AIRPORT_SEARCH}?query=${encodeURIComponent(debouncedQuery)}` 
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