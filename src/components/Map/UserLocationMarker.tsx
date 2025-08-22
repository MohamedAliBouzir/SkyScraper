import { Marker } from "react-map-gl";
import { IconsStyle } from "../../styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface IUserLocationMarkerProps {
  latitude: number;
  longitude: number;
}

export const UserLocationMarker: React.FC<IUserLocationMarkerProps> = ({
  latitude,
  longitude,
}) => {
  return (
    <Marker latitude={latitude} longitude={longitude} anchor="bottom">
      <LocationOnIcon sx={IconsStyle.locationIcon} />
    </Marker>
  );
};
