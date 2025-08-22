import React, { useRef, useCallback } from "react";
import Map, { NavigationControl, FullscreenControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Box } from "@mui/material";
import type { INearbyAirport } from "../../interfaces/Interceptors/flight-api.interface";
import type { ICarLocation } from "../../interfaces/Interceptors/cars-api.interface";
import type {
  IMapboxMapProps,
  IMapViewport,
} from "../../interfaces/map-interface";
import { MapStyle } from "../../styles";
import {
  flyToLocation,
  isCarLocation,
  parseLocationString,
} from "../../utils/mapFunctions";
import { LoadingMap } from "../Map/LoadingMap";
import { ZoomToAllButton } from "../Map/LocationButton";
import { UserLocationMarker } from "../Map/UserLocationMarker";
import { CarLocationMarkers } from "../Map/CarLocationMarker";
import { LocationPopup } from "../Map/InformationCardMark";
import { useMapViewport } from "../../hooks/custom/useMapViewport";
import { useLocationSelection } from "../../hooks/custom/useLocationSelection";
import { useMapBounds } from "../../hooks/custom/useMapBounds";
import { useZoomToAll } from "../../hooks/custom/useZoomToAll";

const MapboxMap: React.FC<IMapboxMapProps> = ({
  latitude,
  longitude,
  carLocations = [],
  height = "400px",
  width = "100%",
  selectedLocationId = null,
  onLocationSelect,
  bounds,
  onBoundsChange,
  onZoomToAll,
  shouldZoomToAll = false,
  onZoomToAllComplete,
}) => {
  const mapRef = useRef(null);

  const { viewport, setViewport } = useMapViewport(latitude, longitude);

  const { selectedLocation, handleLocationClick, handlePopupClose } =
    useLocationSelection(onLocationSelect);

  useMapBounds(
    mapRef,
    carLocations,
    latitude,
    longitude,
    bounds,
    onBoundsChange
  );

  useZoomToAll(
    mapRef,
    carLocations,
    latitude,
    longitude,
    shouldZoomToAll,
    onZoomToAllComplete
  );

  const handleLocationClickWithNavigation = useCallback(
    (location: ICarLocation | INearbyAirport) => {
      handleLocationClick(location);

      if (isCarLocation(location)) {
        const coordinates = parseLocationString(location.location);
        if (coordinates) {
          flyToLocation(mapRef, coordinates.lng, coordinates.lat);
        }
      }
    },
    [handleLocationClick]
  );

  const handleViewportMove = useCallback(
    (evt: { viewState: React.SetStateAction<IMapViewport> }) => {
      setViewport(evt.viewState);
    },
    [setViewport]
  );

  if (latitude == null || longitude == null) {
    return <LoadingMap height={height} width={width} />;
  }

  return (
    <Box height={height} width={width} sx={MapStyle.MapHolder}>
      {onZoomToAll && (
        <ZoomToAllButton
          onZoomToAll={onZoomToAll}
          hasLocations={carLocations.length > 0}
        />
      )}

      <Map
        ref={mapRef}
        {...viewport}
        onMove={handleViewportMove}
        mapboxAccessToken={import.meta.env.VITE_MAPBOX_KEY}
        style={{ width: "100%", height: "100%" }}
        mapStyle={import.meta.env.VITE_MAPBOX_STYLE}
        initialViewState={{
          longitude: longitude,
          latitude: latitude,
          zoom: 10,
        }}
      >
        <UserLocationMarker latitude={latitude} longitude={longitude} />

        <CarLocationMarkers
          carLocations={carLocations}
          selectedLocationId={selectedLocationId}
          onLocationClick={handleLocationClickWithNavigation}
        />

        {selectedLocation && (
          <LocationPopup
            selectedLocation={selectedLocation}
            userLatitude={latitude}
            userLongitude={longitude}
            onClose={handlePopupClose}
          />
        )}

        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
      </Map>
    </Box>
  );
};

export default MapboxMap;
