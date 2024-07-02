import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Box, Typography, Button } from "@mui/material";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f8f9fa",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "0 0 2rem 3rem",
          borderRadius: "10px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: "1000px",
          height: "50rem",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src="/assets/images/Attack-On-Titan-PNG-Photos-1.png"
          alt="Anime Character"
          sx={{
            position: "absolute",
            top: 0,
            right: -100,
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: "96px",
            fontWeight: "bold",
            color: "#ddd",
            margin: 0,
            width: 200,
          }}
        >
          404
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: "24px",
            color: "#272727",
            margin: "10px 0",
          }}
        >
          Oops! This Page Could Not Be Found
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            color: "#666",
            marginBottom: "20px",
            width: 600,
          }}
        >
          Sorry, but the page you are looking for does not exist, has been
          removed, or is temporarily unavailable.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={goToHome}
          sx={{
            fontSize: "16px",
            color: "#fff",
            backgroundColor: "#007bff",
            padding: "10px 20px",
            borderRadius: "5px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#0056b3",
            },
          }}
        >
          Go to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
