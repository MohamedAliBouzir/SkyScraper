import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TBrowserLocation } from "../../types/locations-type";

export const useBrowserLocation = (): TBrowserLocation => {
  const [location, setLocation] = useState<TBrowserLocation>({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });

  const hasFetchedLocation = useRef(false);
  const prevLocationRef = useRef<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });

  const updateLocation = useCallback((lat: number, lng: number) => {
    const prev = prevLocationRef.current;
    if (prev.lat !== lat || prev.lng !== lng) {
      prevLocationRef.current = { lat, lng };
      setLocation({
        latitude: lat,
        longitude: lng,
        loading: false,
        error: null,
      });
    }
  }, []);

  useEffect(() => {
    if (hasFetchedLocation.current) return;
    hasFetchedLocation.current = true;

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => updateLocation(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setLocation((prev) => {
          if (prev.error !== err.message) {
            return {
              latitude: null,
              longitude: null,
              loading: false,
              error: err.message,
            };
          }
          return prev;
        });
      },
      geoOptions
    );
  }, [updateLocation]);

  return useMemo(
    () => location,
    [location.latitude, location.longitude, location.loading, location.error]
  );
};
