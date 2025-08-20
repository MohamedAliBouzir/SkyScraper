import { Box, Typography } from "@mui/material";
import { useLocation } from "../providers/GeoLocation.provider";
import { useEffect, useRef } from "react";
import { CommonStyle } from "../styles";
import PageCommonTitle from "../components/UI/PageCommonTitle";

const Hotels = () => {
  const { latitude, longitude, loading, error } = useLocation();
  const hasLogged = useRef(false);

  useEffect(() => {
    if (!hasLogged.current && !loading) {
      console.log("Location data:", { latitude, longitude, loading, error });
      hasLogged.current = true;
    }
  }, [latitude, longitude, loading, error]);

  return (
    <Box sx={CommonStyle.pageWrapper}>
      <PageCommonTitle
        src="https://storage.googleapis.com/support-kms-prod/P5uaVGK0eWz7PTNic8xuyV0cyiq5VW0EnUFO"
        alt="Hotels Hero"
        text="Hotels"
        imgStyle={{
          width: "100%",
          height: "auto",
          maxHeight: "360px",
          display: "block",
        }}
      />
    </Box>
  );
};

export default Hotels;
