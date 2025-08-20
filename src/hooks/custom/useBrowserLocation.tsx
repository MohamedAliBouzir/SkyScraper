import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { TBrowserLocation } from "../../types/locations-type";

export const useBrowserLocation = (): TBrowserLocation => {
  const [location, setLocation] = useState<TBrowserLocation>({
    latitude: null,
    longitude: null,
    loading: true,
    error: null,
  });

  const prevLocationRef = useRef<{ lat: number | null; lng: number | null }>({
    lat: null,
    lng: null,
  });

  const updateLocation = useCallback((lat: number, lng: number) => {
    const prev = prevLocationRef.current;
    if (prev.lat !== lat || prev.lng !== lng) {
      prevLocationRef.current = { lat, lng };
      setLocation({ latitude: lat, longitude: lng, loading: false, error: null });
    } else {
      setLocation((l) => ({ ...l, loading: false }));
    }
  }, []);

  useEffect(() => {
    const getLocation = () => {
      if (!("geolocation" in navigator)) {
        setLocation({ latitude: null, longitude: null, loading: false, error: "Geolocation not supported" });
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => updateLocation(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          console.warn("Geolocation error:", err.message);
          setLocation({ latitude: null, longitude: null, loading: false, error: err.message });
        }
      );
    };

    getLocation();
  }, [updateLocation]);

  return useMemo(() => location, [location]);
};
