import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useLocation, Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FullLogo from "../../assets/icons/FullLogo.tsx";
import { HeaderStyle } from "../../styles";
import { HeaderMenuItems } from "../../assets/data/MenuData.ts";

const Header: React.FC = () => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = () => (
    <Box
      sx={HeaderStyle.DrawerDesign}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={HeaderStyle.ActionButton}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {HeaderMenuItems.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={HeaderStyle.ListItemsDesign}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar sx={HeaderStyle.appBar}>
        <Toolbar sx={HeaderStyle.toolBar}>
          <Box sx={HeaderStyle.logoHolder}>
            <FullLogo />
          </Box>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={HeaderStyle.MoilePlaceHolder}
              >
                <MenuIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Box sx={HeaderStyle.itemsContainer}>
                {HeaderMenuItems.map((item) => (
                  <Link
                    to={item.path}
                    key={item.id}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography
                      sx={{
                        color:
                          location.pathname === item.path
                            ? "primary.main"
                            : "text.secondary",
                        fontWeight:
                          location.pathname === item.path ? "600" : "400",
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
              <Box sx={HeaderStyle.PlaceHolder} />
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={HeaderStyle.MobileContainer}
      >
        {drawerContent()}
      </Drawer>
    </>
  );
};

export default Header;
