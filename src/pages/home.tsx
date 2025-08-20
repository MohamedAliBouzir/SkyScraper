import { Typography, Box } from "@mui/material";
import SearchInput from "../components/SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import { RentingMenu } from "../menu";
import { Link } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { type ReactElement } from "react";
import { useSearchEverything } from "../hooks/swr/useSearchEverything";
import { getEntityIcon } from "../utils/entityIcons";
import type { SearchResult } from "../interfaces/components-interfaces";
import PageCommonTitle from "../components/UI/PageCommonTitle";
import { CommonStyle } from "../styles";

const iconMap: Record<string, ReactElement> = {
  flights: <FlightIcon />,
  hotels: <HotelIcon />,
  cars: <DirectionsCarIcon />,
};

const Home = () => {
  const menuItems = [
    RentingMenu.flightsPage,
    RentingMenu.hotelsPage,
    RentingMenu.carsPage,
  ];

  const { setQuery, suggestions, isLoading } = useSearchEverything();

  const handleResultClick = (result: SearchResult) => {
    const searchQuery = encodeURIComponent(result.text);
    const googleSearchUrl = `https://www.google.com/search?q=${searchQuery}&tcfs=UgRgAXgB`;
    window.open(googleSearchUrl, "_blank", "noopener,noreferrer");
  };

  const formattedResults = suggestions.map((suggestion) => ({
    text: suggestion.entityName,
    subText: suggestion.hierarchy,
    icon: getEntityIcon(suggestion.entityType),
    data: suggestion,
    entityType: suggestion.entityType,
  }));

  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://www.gstatic.com/travel-frontend/animation/hero/trips_4.svg"
        alt="Hero"
        text="Let's Plan a Trip"
        imgStyle={{ width: "100%", height: "auto", display: "block" }}
      />
      <Box sx={CommonStyle.contentWrapper}>
        <SearchInput
          onSearch={setQuery}
          onResultClick={handleResultClick}
          icon={<SearchIcon />}
          placeholder="Search flights, hotels, cities, airports, attractions..."
          width={{ xs: "100%", md: "40%" }}
          results={formattedResults}
          isLoading={isLoading}
          sx={{
            borderRadius: "50px",
            minWidth: "100px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.19)",
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 2,
            mt: 2,
          }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              style={{ textDecoration: "none" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  px: 2,
                  py: 1,
                  flexDirection: "column",
                  color: "grey.700",
                  transition: "background 0.2s, color 0.2s",
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.main",
                    backgroundColor: "grey.100",
                  },
                }}
              >
                {iconMap[item.id]}
                <Typography
                  sx={{
                    fontWeight: 500,
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
