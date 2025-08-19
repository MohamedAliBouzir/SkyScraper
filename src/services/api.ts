import axios, { type AxiosResponse } from 'axios';

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

// Response interceptors for error handling
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data; // Return only data for SWR compatibility
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
  // Add more endpoints as needed
};

// Generic fetcher for SWR
export const fetcher = <T>(url: string): Promise<T> => 
  apiClient.get(url);
// Generic API call functions
export const apiGet = <T>(url: string, params?: any) => 
  apiClient.get<T>(url, { params });

export const apiPost = <T>(url: string, data?: any) => 
  apiClient.post<T>(url, data);

export const apiPut = <T>(url: string, data?: any) => 
  apiClient.put<T>(url, data);

export const apiDelete = <T>(url: string) => 
  apiClient.delete<T>(url);

// Interface for Server Status
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