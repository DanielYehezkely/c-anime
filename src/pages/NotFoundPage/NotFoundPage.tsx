import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";
import {
  containerStyles,
  contentContainerStyles,
  imageBoxStyles,
  errorCodeStyles,
  errorMessageStyles,
  errorDescriptionStyles,
  homeButtonStyles,
} from "./NotFoundPage.styles";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth={false} sx={containerStyles}>
      <Box sx={contentContainerStyles}>
        <Box
          component="img"
          src="/assets/images/Attack-On-Titan-PNG-Photos-1.png"
          alt="Anime Character"
          sx={imageBoxStyles}
        />
        <Typography variant="h1" sx={errorCodeStyles}>
          404
        </Typography>
        <Typography variant="h4" sx={errorMessageStyles}>
          Oops! This Page Could Not Be Found
        </Typography>
        <Typography variant="body1" sx={errorDescriptionStyles}>
          Sorry, but the page you are looking for does not exist, has been
          removed, or is temporarily unavailable.
        </Typography>
        <Button variant="contained" onClick={goToHome} sx={homeButtonStyles}>
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
