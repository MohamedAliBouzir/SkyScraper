import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || error.message || 'API request failed');
  }
);

export const API_ENDPOINTS = {
  CHECK_SERVER: '/api/v1/checkServer',
  AIRPORT_SEARCH: '/api/v1/flights/searchAirport',
  SEARCH_EVERYTHING: '/api/v1/hotels/searchDestinationOrHotel'
};

export const fetcher = <T>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<T> => {
  return apiClient({
    url,
    ...config,
  });
};
