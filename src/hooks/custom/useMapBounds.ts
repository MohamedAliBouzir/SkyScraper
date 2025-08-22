import { useEffect, useRef } from "react";
import type { ICarLocation } from "../../interfaces/Interceptors/cars-api.interface";
import { createLocationBounds, fitMapBounds } from "../../utils/mapFunctions";

export const useMapBounds = (
  mapRef: any,
  carLocations: ICarLocation[],
  latitude: number | null,
  longitude: number | null,
  bounds?: any,
  onBoundsChange?: (bounds: any) => void
) => {
  const hasZoomedInitially = useRef(false);

  useEffect(() => {
    if (carLocations.length > 0 && mapRef.current && !hasZoomedInitially.current) {
      const locationBounds = createLocationBounds(carLocations, latitude, longitude);
      if (locationBounds) {
        fitMapBounds(mapRef, locationBounds);
        hasZoomedInitially.current = true;
      }
    }
  }, [carLocations.length, latitude, longitude]);

  useEffect(() => {
    if (bounds && mapRef.current && !bounds.isEmpty()) {
      fitMapBounds(mapRef, bounds, 100, 15);
      if (onBoundsChange) {
        setTimeout(() => onBoundsChange(null), 1000);
      }
    }
  }, [bounds, onBoundsChange]);

  return { hasZoomedInitially };
};
