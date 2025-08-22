import { useCallback } from "react";
import { isCarLocation, parseLocationString } from "../../utils/mapFunctions";
import type { INearbyAirport } from "../../interfaces/Interceptors/flight-api.interface";
import type { ICarLocation } from "../../interfaces/Interceptors/cars-api.interface";
import { Popup } from "react-map-gl";
import { Box, Typography } from "@mui/material";

interface LocationPopupProps {
  selectedLocation: INearbyAirport | ICarLocation;
  userLatitude: number;
  userLongitude: number;
  onClose: () => void;
}

export const LocationPopup: React.FC<LocationPopupProps> = ({
  selectedLocation,
  userLatitude,
  userLongitude,
  onClose,
}) => {
  const getPopupCoordinates = useCallback(() => {
    if (isCarLocation(selectedLocation)) {
      const coordinates = parseLocationString(selectedLocation.location);
      return coordinates || { lat: userLatitude, lng: userLongitude };
    }
    return {
      lat: selectedLocation.navigation?.relevantFlightParams?.latitude || userLatitude,
      lng: selectedLocation.navigation?.relevantFlightParams?.longitude || userLongitude,
    };
  }, [selectedLocation, userLatitude, userLongitude]);

  const { lat, lng } = getPopupCoordinates();

  return (
    <Popup
      latitude={lat}
      longitude={lng}
      anchor="top"
      onClose={onClose}
      closeButton={true}
      closeOnClick={false}
    >
      <Box sx={{ p: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          {isCarLocation(selectedLocation)
            ? selectedLocation.entity_name
            : selectedLocation.presentation?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isCarLocation(selectedLocation)
            ? selectedLocation.hierarchy
            : selectedLocation.presentation?.subtitle}
        </Typography>
        
        {isCarLocation(selectedLocation) ? (
          <>
            <Typography variant="caption" display="block">
              ID: {selectedLocation.entity_id}
            </Typography>
            <Typography variant="caption" display="block">
              Type: {selectedLocation.class}
            </Typography>
          </>
        ) : (
          selectedLocation.skyId && (
            <Typography variant="caption" display="block">
              Airport Code: {selectedLocation.skyId}
            </Typography>
          )
        )}
      </Box>
    </Popup>
  );
};
