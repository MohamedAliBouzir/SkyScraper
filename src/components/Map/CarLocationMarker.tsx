import { Marker } from "react-map-gl";
import type { ICarLocation } from "../../interfaces/Interceptors/cars-api.interface";
import {
  isLocationSelected,
  parseLocationString,
} from "../../utils/mapFunctions";
import { IconsStyle } from "../../styles";
import { memo, useCallback, type FC } from "react";
import GarageIcon from "@mui/icons-material/Garage";

interface ICarLocationMarkerProps {
  carLocation: ICarLocation;
  index: number;
  isSelected: boolean;
  onLocationClick: (location: ICarLocation) => void;
}

const CarLocationMarker: FC<ICarLocationMarkerProps> = memo(
  ({ carLocation, index, isSelected, onLocationClick }) => {
    const coordinates = parseLocationString(carLocation.location);
    if (!coordinates) return null;

    const { lat, lng } = coordinates;
    const handleClick = useCallback(() => {
      onLocationClick(carLocation);
    }, [carLocation, onLocationClick]);

    return (
      <Marker
        key={`car-${index}`}
        latitude={lat}
        longitude={lng}
        anchor="bottom"
        onClick={handleClick}
      >
        <GarageIcon
          sx={
            isSelected
              ? IconsStyle.selectedMapIcon
              : IconsStyle.unSelectedMapIcon
          }
        />
      </Marker>
    );
  }
);

CarLocationMarker.displayName = "CarLocationMarker";

//multiple car location Markers
interface ICarLocationMarkersProps {
  carLocations: ICarLocation[];
  selectedLocationId: string | null;
  onLocationClick: (location: ICarLocation) => void;
}

export const CarLocationMarkers: FC<ICarLocationMarkersProps> = memo(
  ({ carLocations, selectedLocationId, onLocationClick }) => {
    return (
      <>
        {carLocations.map((carLocation, index) => {
          const isSelected = isLocationSelected(
            carLocation,
            selectedLocationId
          );

          return (
            <CarLocationMarker
              key={`car-${carLocation.entity_id || index}`}
              carLocation={carLocation}
              index={index}
              isSelected={isSelected}
              onLocationClick={onLocationClick}
            />
          );
        })}
      </>
    );
  }
);

CarLocationMarkers.displayName = "CarLocationMarkers";
