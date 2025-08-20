import { CircularProgress, Box } from '@mui/material';
import { LoadingScreenStyle } from '../styles';

export const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={LoadingScreenStyle.LoadingContainer}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;