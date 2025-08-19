import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import { homeMenu, RentingMenu } from "../../menu";
import FullLogo from "../../assets/icons/FullLogo.tsx";
const Header: React.FC = () => {
  const location = useLocation();

  const menuItems = [
    homeMenu.homePage,
    RentingMenu.flightsPage,
    RentingMenu.hotelsPage,
    RentingMenu.carsPage,
  ];

  return (
    <AppBar
      sx={{
        backgroundColor: "white",
        color: "text.primary",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-around" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FullLogo />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 3,
          }}
        >
          {menuItems.map((item) => (
            <Link to={item.path} key={item.id} style={{ textDecoration: "none" }}>
              <Typography
                key={item.id}
                sx={{
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "text.secondary",
                  fontWeight: location.pathname === item.path ? "600" : "400",
                  cursor: "pointer",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {item.text}
              </Typography>
            </Link>
          ))}
        </Box>

        {/* Placeholder for right side - hidden on mobile */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: 48, // keeps layout balanced
          }}
        />

        {/* Mobile placeholder */}
        <Typography
          variant="h6"
          sx={{
            display: { xs: "block", md: "none" },
            flexGrow: 1,
            textAlign: "right",
          }}
        >
          Header
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
