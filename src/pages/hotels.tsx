import { Box, Typography, Chip, CircularProgress, Alert, Container } from "@mui/material";
import { useGeoLocation } from "../providers/GeoLocation.provider";
import { useEffect, useRef } from "react";
import { CommonStyle } from "../styles";
import PageCommonTitle from "../components/UI/PageCommonTitle";
import { useNearbyAirportsSearch } from "../hooks/swr/useSearch";
import FlightIcon from "@mui/icons-material/Flight";
import MapContainer from "../components/UI/MapboxMap";

const Hotels = () => {
  const { latitude, longitude, loading: locationLoading, error: locationError } = useGeoLocation();
  const hasLogged = useRef(false);

  const { data: nearbyData, isLoading: nearbyLoading, error: nearbyError } = 
    useNearbyAirportsSearch(latitude, longitude, !locationLoading && !locationError);

  useEffect(() => {
    if (!hasLogged.current && !locationLoading) {
      hasLogged.current = true;
    }
  }, [latitude, longitude, locationLoading, locationError, nearbyData]);

  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://storage.googleapis.com/support-kms-prod/P5uaVGK0eWz7PTNic8xuyV0cyiq5VW0EnUFO"
        alt="Hotels Hero"
        text="Hotels & Nearby Airports"
        imgStyle={{
          width: "100%",
          height: "auto",
          maxHeight: "360px",
          display: "block",
        }}
      />
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <MapContainer
            latitude={latitude}
            longitude={longitude}
            title="Nearby Airports Map"
            height="400px"
          />
        </Box>

        {/* Nearby Airports List Section */}
        <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlightIcon /> Nearby Airports
          </Typography>

          {/* Loading and error states remain the same */}
          {locationLoading && <CircularProgress />}
          {locationError && <Alert severity="warning">Location access denied</Alert>}
          {nearbyLoading && <Typography>Finding nearby airports...</Typography>}
          {nearbyError && <Alert severity="error">Failed to load nearby airports</Alert>}

          {/* Display nearby airports */}
          {nearbyData && nearbyData.nearby && nearbyData.nearby.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Found {nearbyData.nearby.length} nearby airports
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {nearbyData.nearby.map((airport, index) => (
                  <Chip
                    key={index}
                    icon={<FlightIcon />}
                    label={`${airport.presentation.title} ${airport.skyId ? `(${airport.skyId})` : ''}`}
                    variant="outlined"
                    sx={{ mb: 1 }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Hotels;