const SearchInputStyle = {
  containingBox: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  },

  inputTextField: {
    maxWidth: "100%",
    backgroundColor: "#fff",
  },

  resultsBox: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    mt: 1,
    zIndex: 1300,
    maxHeight: 300,
    overflowY: "auto",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
  },

  primaryText: {
    fontWeight: 500,
  },

  secondaryText: {
    fontSize: "0.8rem",
    color: "text.secondary",
  },

  searchInputHomeLayout: {
    borderRadius: "50px",
    minWidth: "100px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.19)",
  },
};

export default SearchInputStyle;
