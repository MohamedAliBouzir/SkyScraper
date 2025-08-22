import { Box } from "@mui/material";
import PageCommonTitle from "../components/UI/PageCommonTitle";
import { CommonStyle } from "../styles";
import { useNearbyAirportsSearch } from "../hooks/swr/useSearch";
import { useEffect, useRef } from "react";
import { useGeoLocation } from "../providers/GeoLocation.provider";
import FlightsExplore from "../components/FlightSearch";

const flights = () => {
  const {
    latitude,
    longitude,
    loading: locationLoading,
    error: locationError,
  } = useGeoLocation();
  const hasLogged = useRef(false);

  const { data: nearbyData } = useNearbyAirportsSearch(
    latitude,
    longitude,
    !locationLoading && !locationError
  );

  useEffect(() => {
    if (!hasLogged.current && !locationLoading) {
      hasLogged.current = true;
    }
  }, [latitude, longitude, locationLoading, locationError, nearbyData]);

  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
        alt="Flights Hero"
        text="Flights"
        imgStyle={{ width: "100%", height: "auto", display: "block" }}
      />
      <Box sx={CommonStyle.contentWrapper}>
        <FlightsExplore />
      </Box>
    </Box>
  );
};

export default flights;
