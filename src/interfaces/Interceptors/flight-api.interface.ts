export interface IFlightSearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
}

export interface IFlight {
  id: string;
  price: number;
  airline: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
}

export interface IFlightSearchResponse {
  flights: IFlight[];
  totalResults: number;
  searchParams: IFlightSearchParams;
}

export interface IAirportSuggestion {
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

export interface IUseAirportSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  suggestions: IAirportSuggestion[];
  isLoading: boolean;
  error: Error | undefined;
}

export interface IAirportSearchResponse {
  status: boolean;
  timestamp: number;
  data: IAirportSuggestion[];
}


export interface INearbyAirport {
  skyId?: string;
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

export interface INearbyAirportsResponse {
  status: boolean;
  timestamp: number;
  data: {
    current: INearbyAirport;
    nearby: INearbyAirport[];
    recent: INearbyAirport[];
  };
}