import React, { useContext } from "react";
import { LocationContext } from "../contexts/locationContext";
import { useBrowserLocation } from "../hooks/custom/useBrowserLocation";
import type { TBrowserLocation } from "../types/locations-type";

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location: TBrowserLocation = useBrowserLocation();

  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

// handy consumer hook
export const useLocation = () => {
  const ctx = useContext(LocationContext);
  if (!ctx) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return ctx;
};
