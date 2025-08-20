import { Typography, Box } from "@mui/material";
import SearchInput from "../components/SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import FlightIcon from "@mui/icons-material/Flight";
import { useAirportSearch } from "../hooks/swr/useAirportSearch";


const flights = () => {
    const { setQuery, suggestions, isLoading } = useAirportSearch();

  const formattedResults = suggestions.map(suggestion => ({
    text: suggestion.presentation.title,
    subText: suggestion.presentation.subtitle || suggestion.navigation.entityType,
    icon: <FlightIcon />,
    data: suggestion
  }));
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        mt: { xs: "-2%", sm: "-1%" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
          alt="Flights Hero"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <Typography
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: {
              xs: "1rem",
              sm: "2rem",
              md: "2.5rem",
              lg: "3rem",
            },
            color: "#333333ff",
          }}
        >
          Flights
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <SearchInput
          onSearch={setQuery}
          icon={<SearchIcon />}
          placeholder="Search airports"
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
      </Box>
    </Box>
  );
};

export default flights;
