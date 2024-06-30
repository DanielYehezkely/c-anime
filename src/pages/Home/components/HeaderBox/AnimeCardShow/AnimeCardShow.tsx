import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import React from "react";
import { Props } from "./AnimeCardShow.types";
import './AnimeCardShow.css'


const AnimeCardShow: React.FC<Props> = ( { anime } ) => {
  return (
    <Card
      sx={{
        display: "flex",
        height: "100%",
        width: "70rem",
        gap: "2rem",
        bgcolor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "white",
          width: "50rem",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            flex: "1 0 auto",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            component="div"
            variant="h3"
            sx={{
              fontWeight: "bold",
            }}
          >
            {anime.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            sx={{
              fontSize: "1.8rem",
              color: "#ebeaea",
            }}
          >
            {`${anime.episodes} Episodes`}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
            className="custom-scrollbar"
            sx={{
              fontSize: "1.4rem",
              color: "#ebeaea",
              overflow: "scroll",
              maxHeight: "12rem",
            }}
          >
            {anime.background}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", height: "7rem" }}>
          helo
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: "20rem", borderRadius: "1rem", height: "90%" }}
        image={anime.images.webp.image_url}
        alt="Live from space album cover"
      />
    </Card>
  );
};

export default AnimeCardShow;
