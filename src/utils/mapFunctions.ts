import mapboxgl from "mapbox-gl";
import type { ICarLocation } from "../interfaces/Interceptors/cars-api.interface";
import type { INearbyAirport } from "../interfaces/Interceptors/flight-api.interface";

//parsing location string to return {lat, lng} or null
export const parseLocationString = (
  location: string
): { lat: number; lng: number } | null => {
  const [latStr, lngStr] = location.split(",").map((coord) => coord.trim());
  const lat = parseFloat(latStr);
  const lng = parseFloat(lngStr);

  if (isNaN(lat) || isNaN(lng)) {
    return null;
  }

  return { lat, lng };
};

//add a flighting smooth translation FROM current position TO position y
export const flyToLocation = (
  mapRef: any,
  lng: number,
  lat: number,
  zoom: number = 15,
  duration: number = 2000
): void => {
  if (!mapRef?.current) return;

  const map = mapRef.current.getMap();
  map.flyTo({
    center: [lng, lat],
    zoom,
    duration,
  });
};

// Fit map bounds to show all locations :
export const fitMapBounds = (
  mapRef: any,
  bounds: mapboxgl.LngLatBounds,
  padding: number = 100,
  maxZoom: number = 12,
  duration: number = 2000
): void => {
  if (!mapRef?.current || bounds.isEmpty()) return;

  const map = mapRef.current.getMap();
  map.fitBounds(bounds, {
    padding,
    duration,
    maxZoom,
  });
};

// creating Bounds for locations :
export const createLocationBounds = (
  carLocations: ICarLocation[],
  userLatitude: number | null,
  userLongitude: number | null
): any => {
  const bounds = new mapboxgl.LngLatBounds();

  // Include user location if available
  if (userLatitude != null && userLongitude != null) {
    bounds.extend([userLongitude, userLatitude]);
  }

  // Add all car locations
  carLocations.forEach((car) => {
    const coordinates = parseLocationString(car.location);
    if (coordinates) {
      bounds.extend([coordinates.lng, coordinates.lat]);
    }
  });

  return bounds.isEmpty() ? null : bounds;
};

//check type of location if is car
export const isCarLocation = (location: any): location is ICarLocation => {
  return (
    location &&
    typeof location.class === "string" &&
    typeof location.entity_id === "string"
  );
};

// check if location selected
export const isLocationSelected = (
  location: ICarLocation | INearbyAirport,
  selectedLocationId: string | null
): boolean => {
  if (isCarLocation(location)) {
    return selectedLocationId === location.entity_id;
  }
  return false;
};
