const GroupeButtonStyle = {
  GroupeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    mt: 2,
  },
  ButtonBox: {
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
  },
  TextStyle: {
    fontWeight: 500,
  },
};

export default GroupeButtonStyle;
