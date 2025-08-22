import { IconButton } from "@mui/material";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import { IconsStyle } from "../../styles";

interface ZoomToAllButtonProps {
  onZoomToAll: () => void;
  hasLocations: boolean;
}

export const ZoomToAllButton: React.FC<ZoomToAllButtonProps> = ({ 
  onZoomToAll, 
  hasLocations 
}) => {
  if (!hasLocations) return null;

  return (
    <IconButton 
      onClick={onZoomToAll} 
      sx={IconsStyle.IconButtonDesign}
      aria-label="Zoom to show all locations"
    >
      <ZoomOutMapIcon />
    </IconButton>
  );
};
