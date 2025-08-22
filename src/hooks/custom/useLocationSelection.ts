import { useState, useCallback } from "react";
import type { ICarLocation } from "../../interfaces/Interceptors/cars-api.interface";
import type { INearbyAirport } from "../../interfaces/Interceptors/flight-api.interface";
import { isCarLocation } from "../../utils/mapFunctions";

export const useLocationSelection = (onLocationSelect?: (location: ICarLocation | null) => void) => {
  const [selectedLocation, setSelectedLocation] = useState<INearbyAirport | ICarLocation | null>(null);

  const handleLocationClick = useCallback((location: ICarLocation | INearbyAirport) => {
    setSelectedLocation(location);
    if (onLocationSelect && isCarLocation(location)) {
      onLocationSelect(location);
    }
  }, [onLocationSelect]);

  const handlePopupClose = useCallback(() => {
    setSelectedLocation(null);
    if (onLocationSelect) {
      onLocationSelect(null);
    }
  }, [onLocationSelect]);

  return { selectedLocation, handleLocationClick, handlePopupClose };
};
