import { useEffect } from "react";
import type { ICarLocation } from "../../interfaces/Interceptors/cars-api.interface";
import { createLocationBounds, fitMapBounds } from "../../utils/mapFunctions";

export const useZoomToAll = (
  mapRef: any,
  carLocations: ICarLocation[],
  latitude: number | null,
  longitude: number | null,
  shouldZoomToAll: boolean,
  onZoomToAllComplete?: () => void
) => {
  useEffect(() => {
    if (shouldZoomToAll && carLocations.length > 0 && mapRef.current) {
      const locationBounds = createLocationBounds(carLocations, latitude, longitude);
      if (locationBounds) {
        fitMapBounds(mapRef, locationBounds);
        if (onZoomToAllComplete) {
          setTimeout(() => onZoomToAllComplete(), 1000);
        }
      }
    }
  }, [shouldZoomToAll, carLocations, latitude, longitude, onZoomToAllComplete]);
};
