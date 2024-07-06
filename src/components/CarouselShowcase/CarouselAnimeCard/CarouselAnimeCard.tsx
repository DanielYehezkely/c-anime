import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Anime } from "../../../types/Anime";
import {
  CalendarToday as DateIcon,
  DeleteOutline,
  LibraryAddCheck,
} from "@mui/icons-material";
import { useNavigationHelper } from "../../../hooks/useNavigationHelper";
import { useLocation } from "react-router";

interface CarouselAnimeCardProps {
  anime: Anime;
  onRemove?: (id: number) => void;
  onDoneWatching?: (id: number) => void;
}

const CarouselAnimeCard: React.FC<CarouselAnimeCardProps> = ({
  anime,
  onRemove,
  onDoneWatching,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigateToPage = useNavigationHelper();
  const location = useLocation().pathname;

  const handleCardHover = () => {
    location === "/watchlist" ? setIsHovered(true) : "";
  };

  const defaultClickHandler = () => {
    location === "/watchlist"
      ? ""
      : navigateToPage(`singleAnime/${anime.mal_id}`);
  };

  return (
    <Card
      onClick={defaultClickHandler}
      onMouseEnter={() => handleCardHover()}
      onMouseLeave={() => setIsHovered(false)}
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
        position: "relative",
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
          transition: "filter 0.2s ease-in",
          filter: isHovered ? "blur(5px)" : "none",
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
          <DateIcon />
          {anime.season && anime.year
            ? `${anime.season} ${anime.year}`
            : anime.aired.string}
        </Typography>
      </CardContent>
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Button
            sx={{
              bgcolor: "#0c0c0c",
              fontSize: "1.2rem",
              color: "white",
              borderRadius: "1rem",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#0c0c0c",
              },
            }}
            color="primary"
            onClick={() => onDoneWatching?.(anime.mal_id)}
          >
            Move to Done Watching
            <LibraryAddCheck sx={{ fontSize: "2.5rem" }} />
          </Button>
          <Button
            onClick={() => onRemove?.(anime.mal_id)}
            sx={{
              bgcolor: "#0c0c0c",
              fontSize: "1.2rem",
              color: "white",
              borderRadius: "1rem",
              textTransform: "none",
              "&:hover": {
                bgcolor: "#0c0c0c",
              },
            }}
          >
            remove from watch list
            <DeleteOutline sx={{ fontSize: "2.5rem" }} />
          </Button>
        </Box>
      )}
    </Card>
  );
};

export default CarouselAnimeCard;
