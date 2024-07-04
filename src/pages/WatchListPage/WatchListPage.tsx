import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { db } from "../../config/firebaseConfig";
import { Anime } from "../../types/Anime";
import { useAnimeApi } from "../../hooks/useAnimeApi"; 

const WatchListPage: React.FC = () => {
  const { user } = useAuth();
  const { animeList, loading } = useAnimeApi();
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [filteredAnime, setFilteredAnime] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setWatchlist(userData.watchlist || []);
        }
      }
    };

    fetchWatchlist();
  }, [user]);

  useEffect(() => {
    if (animeList.length && watchlist.length) {
      const filtered = animeList.filter((anime) =>
        watchlist.includes(anime.mal_id.toString())
      );
      setFilteredAnime(filtered);
    }
  }, [animeList, watchlist]);

  const handleRemove = async (id: number) => {
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        watchlist: arrayRemove(id.toString()),
      });
      setWatchlist(watchlist.filter((animeId) => animeId !== id.toString()));
      setFilteredAnime(filteredAnime.filter((anime) => anime.mal_id !== id));
    }
  };

  if (loading) {
    return (
      <Container sx={{ paddingTop: "10rem" }}>
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Loading Watchlist...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingTop: "10rem" }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        My Watchlist
      </Typography>
      {filteredAnime.length === 0 ? (
        <Typography variant="h6" sx={{ color: "white" }}>
          Your watchlist is empty.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {filteredAnime.map((anime) => (
            <Grid item key={anime.mal_id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  backgroundColor: "#1c1c1c",
                  color: "white",
                  position: "relative",
                  height: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={anime.images.webp.image_url}
                  alt={anime.title}
                />
                <CardContent>
                  <Typography variant="h5" gutterBottom sx={{ color: "white" }}>
                    {anime.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "gray" }}>
                    {anime.synopsis}
                  </Typography>
                </CardContent>
                <Box sx={{ position: "absolute", top: "10px", right: "10px" }}>
                  <IconButton
                    aria-label="delete"
                    sx={{ color: "white" }}
                    onClick={() => handleRemove(anime.mal_id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default WatchListPage;
