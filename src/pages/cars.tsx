import { Box } from "@mui/material";
import PageCommonTitle from "../components/UI/PageCommonTitle";
import { CommonStyle, SearchInputStyle } from "../styles";
import SearchInput from "../components/SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import GarageIcon from "@mui/icons-material/Garage";
import { useSearch } from "../hooks/swr/useSearch";
import MapboxMap from "../components/UI/MapboxMap";
import { useGeoLocation } from "../providers/GeoLocation.provider";
import { useEffect, useRef, useState } from "react";
import type { ICarLocation } from "../interfaces/Interceptors/cars-api.interface";
import mapboxgl from "mapbox-gl";

const Cars = () => {
  // fetch user location
  const {
    latitude,
    longitude,
    loading: locationLoading,
    error: locationError,
  } = useGeoLocation();

  const hasLogged = useRef(false);
  const [selectedCar, setSelectedCar] = useState<ICarLocation | null>(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [mapBounds, setMapBounds] = useState<mapboxgl.LngLatBounds | null>(null);
  const [shouldZoomToAll, setShouldZoomToAll] = useState(false);
  const [hasInitialZoom, setHasInitialZoom] = useState(false);

  useEffect(() => {
    if (!hasLogged.current && !locationLoading) {
      hasLogged.current = true;
    }
  }, [latitude, longitude, locationLoading, locationError]);

  const { setQuery, data, isLoading } = useSearch.cars();

  const validCarLocations = data.filter((car) => {
    const [lat, lng] = car.location
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    return !isNaN(lat) && !isNaN(lng);
  });

  useEffect(() => {
    if (validCarLocations.length > 0 && !hasInitialZoom) {
      setShouldZoomToAll(true);
      setHasInitialZoom(true);
    }
  }, [validCarLocations.length, hasInitialZoom]);

  const centerCoords =
    latitude && longitude
      ? { lat: latitude, lng: longitude }
      : { lat: 40.7128, lng: -74.006 };

  const formattedResults = data.map((suggestion) => ({
    text: suggestion.entity_name,
    subText: suggestion.hierarchy,
    icon: <GarageIcon />,
    data: suggestion,
  }));

  const handleSearchResultSelect = (result: any) => {
    const selectedCar = result.data as ICarLocation;
    setSelectedCar(selectedCar);
    setSearchInputValue(selectedCar.entity_name);
    const [lat, lng] = selectedCar.location
      .split(",")
      .map((coord) => parseFloat(coord.trim()));
    
    if (!isNaN(lat) && !isNaN(lng)) {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([lng, lat]);
      setMapBounds(bounds);
      setShouldZoomToAll(false);
    }
  };

  const handleMapLocationSelect = (location: ICarLocation | null) => {
    setSelectedCar(location);
    if (location) {
      setSearchInputValue(location.entity_name);
      const [lat, lng] = location.location
        .split(",")
        .map((coord) => parseFloat(coord.trim()));
      
      if (!isNaN(lat) && !isNaN(lng)) {
        const bounds = new mapboxgl.LngLatBounds();
        bounds.extend([lng, lat]);
        setMapBounds(bounds);
        setShouldZoomToAll(false);
      }
    } else {
      setSearchInputValue("");
      handleZoomToAllMarkers();
    }
  };
  const handleZoomToAllMarkers = () => {
    if (validCarLocations.length > 0) {
      setSelectedCar(null);
      setShouldZoomToAll(true);
    }
  };

  const handleSearchChange = (query: string) => {
    setQuery(query);
    if (query === "") {
      setSelectedCar(null);
      setSearchInputValue("");
      handleZoomToAllMarkers();
    }
  };

  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://cdni.iconscout.com/illustration/premium/thumb/order-car-on-rent-via-mobile-app-6031683-5053357.png"
        alt="Cars Hero"
        text="Cars"
        imgStyle={{ width: "auto", maxHeight: "360px", display: "block" }}
      />
      <Box sx={CommonStyle.contentWrapper}>
        <SearchInput
          onSearch={handleSearchChange}
          onResultClick={handleSearchResultSelect}
          icon={<SearchIcon />}
          placeholder="Search car locations, cities, or airports"
          width={{ xs: "100%", md: "40%" }}
          results={formattedResults}
          isLoading={isLoading}
          sx={SearchInputStyle.searchInputHomeLayout}
          value={searchInputValue}
          onValueChange={setSearchInputValue}
        />

        <Box sx={{ mt: 4, width: "100%" }}>
          <MapboxMap
            latitude={centerCoords.lat}
            longitude={centerCoords.lng}
            carLocations={validCarLocations}
            height="500px"
            width="100%"
            title="Car Rental Locations"
            selectedLocationId={selectedCar?.entity_id || null}
            onLocationSelect={handleMapLocationSelect}
            bounds={mapBounds}
            onBoundsChange={setMapBounds}
            onZoomToAll={handleZoomToAllMarkers}
            shouldZoomToAll={shouldZoomToAll}
            onZoomToAllComplete={() => setShouldZoomToAll(false)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Cars;