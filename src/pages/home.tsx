import { Typography, Box } from "@mui/material";
import SearchInput from "../components/SearchInput";
import SearchIcon from "@mui/icons-material/Search";
import { RentingMenu } from "../menu";
import { Link } from "react-router-dom";
import FlightIcon from "@mui/icons-material/Flight";
import HotelIcon from "@mui/icons-material/Hotel";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useState, type ReactElement } from "react";

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

  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    console.log("Searching:", query);

    if (!query) {
      setResults([]);
      return;
    }

    // Example API call
    const fakeResults = [
      { text: "Zarzis", subText: "Ville en Tunisie", icon: <FlightIcon /> },
      { text: "Zarat", subText: "Ville en Tunisie", icon: <FlightIcon /> },
      { text: "zarzis hotel", subText: "", icon: <HotelIcon /> },
      { text: "zarzis maps", subText: "", icon: <SearchIcon /> },
    ];
    setResults(fakeResults);
  };

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
          src="https://www.gstatic.com/travel-frontend/animation/hero/trips_4.svg"
          alt="Hero"
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
          Let's Plan a Trip
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
          onSearch={handleSearch}
          icon={<SearchIcon />}
          placeholder="Search Flights, Hotels and many more..."
          width={{ xs: "100%", md: "40%" }}
          results={results}
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
