import { useApiSearch } from './useAPISearch';
import type { 
  IAirportSearchResponse,
  INearbyAirportsResponse,
} from '../../interfaces/Interceptors/flight-api.interface';
import type {
  ICarSearchResponse,
} from '../../interfaces/Interceptors/cars-api.interface';
import type {
  ISearchEverythingResponse,
} from '../../interfaces/Interceptors/everyThing-api.interface';

export const useSearch = {
  airports: () => useApiSearch<IAirportSearchResponse['data'][0][]>({
    endpoint: 'AIRPORT_SEARCH',
  }),

  cars: () => useApiSearch<ICarSearchResponse['data'][0][]>({
    endpoint: 'SEARCH_CARS_LOCATIONS',
  }),

  everything: () => useApiSearch<ISearchEverythingResponse['data'][0][]>({
    endpoint: 'SEARCH_EVERYTHING',
  }),

  nearbyAirports: (lat: number | null, lng: number | null, enabled = true) => 
    useApiSearch<INearbyAirportsResponse['data']>({
      endpoint: 'NEARBY_AIRPORTS',
      enabled: enabled && lat !== null && lng !== null,
      customParams: { lat, lng },
    }),
};

export const useAirportSearch = () => useSearch.airports();
export const useCarsLocationsSearch = () => useSearch.cars();
export const useSearchEverything = () => useSearch.everything();
export const useNearbyAirportsSearch = (lat: number | null, lng: number | null, enabled = true) => 
  useSearch.nearbyAirports(lat, lng, enabled);