import { Box } from "@mui/material";
import { useLocation } from "../providers/GeoLocation.provider";
import { useEffect, useRef } from "react";
import { CommonStyle } from "../styles";
import PageCommonTitle from "../components/UI/PageCommonTitle";
import { useNearbyAirportsSearch } from "../hooks/swr/useSearch";

const Hotels = () => {
  const { latitude, longitude, loading: locationLoading, error: locationError } = useLocation();
  const hasLogged = useRef(false);
  
  const { data: nearbyData, isLoading: nearbyLoading, error: nearbyError } = 
    useNearbyAirportsSearch(latitude, longitude, !locationLoading && !locationError);

  useEffect(() => {
    if (!hasLogged.current && !locationLoading) {
      console.log("Location data:", { latitude, longitude, loading: locationLoading, error: locationError });
      console.log("Nearby airports data:", nearbyData);
      hasLogged.current = true;
    }
  }, [latitude, longitude, locationLoading, locationError, nearbyData]);

  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://storage.googleapis.com/support-kms-prod/P5uaVGK0eWz7PTNic8xuyV0cyiq5VW0EnUFO"
        alt="Hotels Hero"
        text="Hotels"
        imgStyle={{
          width: "100%",
          height: "auto",
          maxHeight: "360px",
          display: "block",
        }}
      />
    </Box>
  );
};

export default Hotels;