import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import FullLogo from "../../assets/icons/FullLogo.tsx";
import { HeaderStyle } from "../../styles";
import { HeaderMenuItems } from "../../assets/data/MenuData.ts";

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <AppBar sx={HeaderStyle.appBar}>
      <Toolbar sx={HeaderStyle.toolBar}>
        <Box sx={HeaderStyle.logoHolder}>
          <FullLogo />
        </Box>
        <Box sx={HeaderStyle.itemsContainer}>
          {HeaderMenuItems.map((item) => (
            <Link
              to={item.path}
              key={item.id}
              style={{ textDecoration: "none" }}
            >
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
        <Box sx={HeaderStyle.PlaceHolder} />

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
