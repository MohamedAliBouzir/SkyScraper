import { useEffect, useState } from "react";
import type { IMapViewport } from "../../interfaces/map-interface";

export const useMapViewport = (initialLatitude: number | null, initialLongitude: number | null) => {
  const [viewport, setViewport] = useState<IMapViewport>({
    latitude: initialLatitude ?? 0,
    longitude: initialLongitude ?? 0,
    zoom: 10,
  });

  useEffect(() => {
    if (initialLatitude != null && initialLongitude != null) {
      setViewport(prev => ({
        ...prev,
        latitude: initialLatitude,
        longitude: initialLongitude,
      }));
    }
  }, [initialLatitude, initialLongitude]);

  return { viewport, setViewport };
};
