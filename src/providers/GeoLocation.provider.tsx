import React, { useMemo } from "react";
import { LocationContext } from "../contexts/locationContext";
import { useBrowserLocation } from "../hooks/custom/useBrowserLocation";
import type { TBrowserLocation } from "../types/locations-type";

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useBrowserLocation();
  const contextValue = useMemo(
    () => location,
    [location.latitude, location.longitude, location.loading, location.error]
  );

  return (
    <LocationContext.Provider value={contextValue}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): TBrowserLocation => {
  const context = React.useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
