import { useEffect, useState } from "react";
import type { TBrowserLocation } from "../../types/locations-type";

export const useBrowserLocation = (): TBrowserLocation => {
  const [location, setLocation] = useState<TBrowserLocation>({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation({
        latitude: null,
        longitude: null,
        loading: false,
        error: "Geolocation not supported",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          loading: false,
          error: null,
        });
      },
      (err) => {
        setLocation({
          latitude: null,
          longitude: null,
          loading: false,
          error: err.message,
        });
      }
    );
  }, []);

  return location;
};
