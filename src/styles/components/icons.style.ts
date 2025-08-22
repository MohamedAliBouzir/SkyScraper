const IconsStyle = {
  garageIcon: {},
  locationIcon: {
    color: "primary.main",
    fontSize: 32,
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  },
  IconButtonDesign: {
    position: "absolute",
    top: 10,
    right: 50,
    zIndex: 1000,
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "grey.100",
    },
  },
  selectedMapIcon: {
    color: "error.main",
    fontSize: 24,
    filter: "drop-shadow(0 2px 6px rgba(255,0,0,0.5))",
    transform: "scale(1.2)",
    transition: "all 0.2s ease-in-out",
  },
  unSelectedMapIcon: {
    color: "secondary.main",
    fontSize: 24,
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
    transform: "scale(1)",
    transition: "all 0.2s ease-in-out",
  },
};

export default IconsStyle;
