import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';

// Base API client configuration
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
    'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth tokens or other headers here
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    console.error('API Error:', error);
    throw new Error(error.response?.data?.message || error.message || 'API request failed');
  }
);

// API endpoints
export const API_ENDPOINTS = {
  CHECK_SERVER: '/api/v1/checkServer',
  FLIGHTS_SEARCH: '/api/v1/flights/search',
  FLIGHTS_DETAILS: '/api/v1/flights/detail',
  AIRPORT_SEARCH: '/api/v1/flights/searchAirport', // NEW
};

// Enhanced fetcher that supports all HTTP methods and configurations
export const fetcher = <T>(
  url: string, 
  config?: AxiosRequestConfig
): Promise<T> => {
  return apiClient({
    url,
    ...config,
  });
};

// Method-specific fetchers
export const getFetcher = <T>(url: string, params?: any): Promise<T> =>
  fetcher<T>(url, { method: 'GET', params });

export const postFetcher = <T>(url: string, data?: any): Promise<T> =>
  fetcher<T>(url, { method: 'POST', data });

export const putFetcher = <T>(url: string, data?: any): Promise<T> =>
  fetcher<T>(url, { method: 'PUT', data });

export const deleteFetcher = <T>(url: string): Promise<T> =>
  fetcher<T>(url, { method: 'DELETE' });

// Generic API call functions
export const apiGet = <T>(url: string, params?: any) => 
  apiClient.get<T>(url, { params });

export const apiPost = <T>(url: string, data?: any) => 
  apiClient.post<T>(url, data);

export const apiPut = <T>(url: string, data?: any) => 
  apiClient.put<T>(url, data);

export const apiDelete = <T>(url: string) => 
  apiClient.delete<T>(url);

// ===== EXISTING INTERFACES =====

// Interface for Server Status (for useTestServer)
export interface ServerStatus {
  status: boolean;
  message: string;
}

// Interface for Flight Search (example - will change based on actual API)
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

// ===== NEW INTERFACES FOR AIRPORT SEARCH =====

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