export const HeaderStyle = {
  appBar: {
    backgroundColor: "white",
    color: "text.primary",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  toolBar: {
    justifyContent: "space-around",
  },
  logoHolder: {
    display: "flex",
    alignItems: "center",
  },
  itemsContainer: {
    display: { xs: "none", md: "flex" },
    gap: 3,
  },
  PlaceHolder: {
    display: { xs: "none", md: "block" },
    width: "8%",
  },
  MoilePlaceHolder: { display: { xs: "block", md: "none" } },
  MobileContainer: {
    display: { xs: "block", md: "none" },
    "& .MuiDrawer-paper": {
      boxSizing: "border-box",
      width: 250,
    },
  },
  DrawerDesign: {
    width: 250,
    paddingTop: 2,
    backgroundColor: "background.paper",
    height: "100%",
  },
  ActionButton: { display: "flex", justifyContent: "flex-end", padding: 1 },
  ListItemsDesign: {
    "&.Mui-selected": {
      backgroundColor: "primary.light",
      color: "primary.main",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "primary.light",
    },
  },
};

export const MobileHeaderStyle = {};
