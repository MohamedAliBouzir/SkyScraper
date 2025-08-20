import React from "react";
import { Typography, Box, Button, Paper } from "@mui/material";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { homeMenu } from "../menu";
import { NotFoundStyle } from "../styles";

const Page404: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(homeMenu.homePage.path);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={NotFoundStyle.notFoundContainer}>
      <Typography variant="h1" component="h1" sx={NotFoundStyle.StyleNumber}>
        404
      </Typography>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={NotFoundStyle.StyleTitle}
      >
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={NotFoundStyle.StyleDescription}>
        Sorry, we couldn't find the page you're looking for. The page might have
        been moved, deleted, or you entered the wrong URL.
      </Typography>

      <Box sx={NotFoundStyle.StyleButtonContainer}>
        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={handleGoHome}
          sx={NotFoundStyle.StyleButton}
        >
          Go Home
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          sx={NotFoundStyle.StyleButton}
        >
          Go Back
        </Button>
      </Box>

      <Paper elevation={0} sx={NotFoundStyle.StyleDirectionsContainer}>
        <Typography variant="body2" sx={NotFoundStyle.StyleDirectionsTitle}>
          Need help?
        </Typography>
        <Typography variant="body2">
          Contact support or check our documentation for assistance.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Page404;
