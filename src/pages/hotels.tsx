import { Box, CircularProgress, Typography } from "@mui/material"
import { useLocation } from "../providers/GeoLocation.provider";

const hotels = () => {

  const { latitude, longitude, loading, error } = useLocation();

  console.log(latitude, longitude, loading, error);
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
          src="https://storage.googleapis.com/support-kms-prod/P5uaVGK0eWz7PTNic8xuyV0cyiq5VW0EnUFO"
          alt="Flights Hero"
          style={{ width: "100%", height: "auto", maxHeight:"360px", display: "block" }}
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
          Hotels
        </Typography>
      </Box>
    </Box>
  )
}

export default hotels