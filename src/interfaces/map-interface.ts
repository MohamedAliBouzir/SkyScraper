import type { ICarLocation } from "./Interceptors/cars-api.interface";
import type { INearbyAirport } from "./Interceptors/flight-api.interface";

export interface IMapboxFeature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: {
    accuracy?: string;
    mapbox_id?: string;
  };
  text: string;
  place_name: string;
  center: [number, number];
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  context?: any[];
}

export interface IMapboxResponse {
  type: string;
  query: string[];
  features: IMapboxFeature[];
  attribution: string;
}

export interface IMapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface IMapboxMapProps {
  latitude: number | null;
  longitude: number | null;
  nearbyAirports?: INearbyAirport[];
  carLocations?: ICarLocation[];
  currentAirport?: INearbyAirport;
  height?: string;
  width?: string;
  title?: string;
  selectedLocationId?: string | null;
  onLocationSelect?: (location: ICarLocation | null) => void;
  bounds?: mapboxgl.LngLatBounds | null;
  onBoundsChange?: (bounds: mapboxgl.LngLatBounds | null) => void;
  onZoomToAll?: () => void;
  shouldZoomToAll?: boolean;
  onZoomToAllComplete?: () => void;
}