import {
  Box,
  CardContent,
  Typography,
  Button,
  TextareaAutosize,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAnimeApi } from "../../hooks/useAnimeApi";
import { Anime } from "../../types/Anime";
import { Loader } from "../../components";
import getAnimeBannerByTitle from "../../services/animeMalApi/animeAnilistService";
import {
  AccountCircleRounded,
  ThumbDown as DislikeIcon,
  ThumbUp as LikeIcon,
} from "@mui/icons-material";

import CarouselShowcase from "../../components/CarouselShowcase/CarouselShowcase";
import { SingleAnimePageContainer, UnderlayBackgroundBox } from "./SingleAnimePage.styles";
import SingleAnimeCard from "./components/SingleAnimeCard/SingleAnimeCard";

const SingleAnimePage: React.FC = () => {
  
  const { animeId } = useParams<{ animeId: string }>();
  const { animeList } = useAnimeApi();
  const [bannerImageBackground, setBannerImageBackground] = useState<
    string | null
  >(null);

  const anime = animeList.find(
    (anime: Anime) => anime.mal_id === Number(animeId)
  );

  useEffect(() => {
    const fetchAnimeBannerImage = async (): Promise<void> => {
      if (anime) {
        const bannerImg = await getAnimeBannerByTitle(anime);
        setBannerImageBackground(bannerImg);
      }
    };
    fetchAnimeBannerImage();
  }, [anime]);

  if (!anime) {
    return <Loader actionLabel="fetching..." />;
  }

  return (
    <SingleAnimePageContainer  maxWidth={false}>
      <UnderlayBackgroundBox
      component="div"
        style={{
          backgroundImage: `
      linear-gradient(to right, #000000 10%, rgba(0, 0, 0, 0.425) 50%),
      linear-gradient(to top, #0C0C0C, #00000000 20%),
      url(${bannerImageBackground || anime.images.jpg.large_image_url})
    `,
        }}
      />
    <SingleAnimeCard anime={anime}/>
      <Box
        component="div"
        sx={{
          width: "95%",
          height: "27rem",
          zIndex: 2,
          display: "flex",
          padding: "0",
        }}
      >
        <CardContent
          sx={{
            width: "50%",
            color: "white",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" color="#b967da">
            Rank (out of 100): {anime.rank}
          </Typography>
          <Typography component="p" gutterBottom fontWeight="bold">
            {anime.background
              ? anime.background
              : "No Background Provided on this anime"}
          </Typography>
          <Typography variant="body1" gutterBottom fontSize="1.4rem">
            Released : {anime.aired.string}
          </Typography>
          <Typography variant="h5" color="#9b9a9a">
            Daily Stream: {anime.broadcast.day}
          </Typography>
          <Typography variant="h5" color="#9b9a9a">
            Episodes : {anime.episodes}
          </Typography>
          <Typography variant="h5" color="#d10707">
            {anime.rating}
          </Typography>
          <Box
            sx={{
              marginTop: "2rem",
              display: "flex",
              gap: "1rem",
            }}
          >
            <Button
              color="primary"
              component={Link}
              to={`/trailer/${anime.mal_id}`} //*? Putted template literal here and the overload prob was gone .
              sx={{
                color: "white",
                fontSize: "1.4rem",
                border: "1px solid white",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "gold",
                  borderColor: "gold",
                },
              }}
            >
              Watch Trailer
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component="a"
              href={anime.url}
              target="_blank"
              sx={{
                color: "white",
                fontSize: "1.4rem",
              }}
            >
              Read Manga
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                color: "white",
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Like <LikeIcon />
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{
                color: "white",
                fontSize: "1.4rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Unlike <DislikeIcon />
            </Button>
            <Button
              sx={{
                color: "white",
                fontSize: "1.4rem",
                border: "1px solid transparent",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                bgcolor: "#806900",
                "&:hover": {
                  color: "#d47100",
                  borderColor: "gold",
                  bgcolor: "#dadada",
                },
              }}
            >
              Add to watch list
            </Button>
          </Box>
        </CardContent>
      </Box>
      <Box
        component="div"
        sx={{
          width: "95%",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem 0 2rem 2rem",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "1rem",
          marginTop: "2rem",
        }}
      >
        <Typography variant="h5" color="white">
          0 Comments
          {/* //*TODO - put the number of comments based on api comments array */}
        </Typography>
        <Divider sx={{ borderColor: "white" }} />
        <Box
          component="form"
          sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
        >
          <AccountCircleRounded sx={{ color: "white", fontSize: "4rem" }} />
          <TextareaAutosize //*TODO - user image will be here next to comment
            minRows={2}
            placeholder="Leave a comment"
            style={{
              width: "90%",
              borderRadius: "0.5rem",
              padding: "1rem",
              fontSize: "1rem",
              borderColor: "white",
              backgroundColor: "white",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ fontSize: "1rem", bgcolor: "#6327d1" }}
          >
            Submit
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            marginTop: "2rem",
            color: "white",
          }}
        >
          No Commets Yet
        </Box>
      </Box>
      <CarouselShowcase carouselLabel={"Recommendations"} />
    </SingleAnimePageContainer>
  );
};

export default SingleAnimePage;
