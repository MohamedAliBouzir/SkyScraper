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

export const getFetcher = <T>(url: string, params?: any): Promise<T> =>
  fetcher<T>(url, { method: 'GET', params });

export const postFetcher = <T>(url: string, data?: any): Promise<T> =>
  fetcher<T>(url, { method: 'POST', data });

export const putFetcher = <T>(url: string, data?: any): Promise<T> =>
  fetcher<T>(url, { method: 'PUT', data });

export const deleteFetcher = <T>(url: string): Promise<T> =>
  fetcher<T>(url, { method: 'DELETE' });

export const apiGet = <T>(url: string, params?: any) => 
  apiClient.get<T>(url, { params });

export const apiPost = <T>(url: string, data?: any) => 
  apiClient.post<T>(url, data);

export const apiPut = <T>(url: string, data?: any) => 
  apiClient.put<T>(url, data);

export const apiDelete = <T>(url: string) => 
  apiClient.delete<T>(url);

export interface ServerStatus {
  status: boolean;
  message: string;
}

export interface FlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
}

export interface Flight {
  id: string;
  price: number;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

export interface FlightSearchResponse {
  flights: Flight[];
  totalResults: number;
  searchParams: FlightSearchParams;
}

export interface AirportSuggestion {
  skyId: string;
  entityId: string;
  presentation: {
    title: string;
    suggestionTitle: string;
    subtitle: string;
  };
  navigation: {
    entityId: string;
    entityType: string;
    localizedName: string;
    relevantFlightParams: {
      skyId: string;
      entityId: string;
      flightPlaceType: string;
      localizedName: string;
    };
    relevantHotelParams?: {
      entityId: string;
      entityType: string;
      localizedName: string;
    };
  };
}

export interface AirportSearchResponse {
  status: boolean;
  timestamp: number;
  data: AirportSuggestion[];
}