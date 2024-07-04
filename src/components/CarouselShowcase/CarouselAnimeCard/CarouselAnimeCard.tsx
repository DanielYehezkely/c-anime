import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Anime } from "../../../types/Anime";
import { CalendarToday as DateIcon } from "@mui/icons-material";
import { useNavigationHelper } from "../../../hooks/useNavigationHelper";

interface CarouselAnimeCardProps {
  anime: Anime;
}

const CarouselAnimeCard: React.FC<CarouselAnimeCardProps> = ({ anime }) => {

  const navigateToPage = useNavigationHelper();

  const handleCardClick = () => {
    navigateToPage(`singleAnime/${anime.mal_id}`); 
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: "25rem",
        overflow: "visible",
        maxHeight: "60rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        cursor: "pointer",
        "&:hover": {
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          height: "70%",
          width: "100%",
          overflow: "hidden",
          borderRadius: "1rem",
          boxShadow: "0 0 1px 1px #525151",
        }}
      >
        <CardMedia
          component="img"
          alt={`${anime.title}-image`}
          image={anime.images.jpg.large_image_url}
          sx={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `linear-gradient(to top, #0c0c0c, rgba(0, 0, 0, 0.055) 30%)`,
          }}
        />
      </Box>
      <CardContent sx={{ height: "30%", overflow: "hidden" }}>
        <Typography
          sx={{
            color: "white",
            fontSize: "1.6rem",
          }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {anime.title}
        </Typography>
        <Typography
          sx={{
            color: "#727272",
            fontSize: "1.4rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          component="span"
        >
          <DateIcon /> {`${anime.season} ${anime.year}`}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarouselAnimeCard;
