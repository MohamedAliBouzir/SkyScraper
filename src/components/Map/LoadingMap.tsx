import { Box, CircularProgress } from "@mui/material";
import { MapStyle } from "../../styles";

interface ILoadingMapProps {
  height: string;
  width: string;
}

export const LoadingMap: React.FC<ILoadingMapProps> = ({ height, width }) => {
  return (
    <Box height={height} width={width} sx={MapStyle.MapContainer}>
      <CircularProgress />
    </Box>
  );
};