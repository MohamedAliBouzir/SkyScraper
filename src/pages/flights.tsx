import { Box, Typography } from "@mui/material";

const flights = () => {
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
    </Box>
  );
};

export default flights;
