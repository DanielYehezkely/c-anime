import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Anime } from "../../types/Anime";
import {
  getDocs,
  collection,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import { Loader } from "../../components";
import {
  CarouselShowcase,
  CommentSection,
  SingleAnimeActionBtns,
  SingleAnimeCard,
  SingleAnimeData,
} from "./components";
import {
  SingleAnimePageContainer,
  UnderlayBackgroundBox,
} from "./SingleAnimePage.styles";
import { useAuth } from "../../context/AuthContext/AuthContext";
import { useAnime } from "../../context/FetchMalAnimeContext/FetchMalAnimeContext";
import useAnilistBannerImage from "../../hooks/useAnilistBannerImage";
import { useFirebase } from "../../context/FirebaseContext/FirebaseContext";

const SingleAnimePage: React.FC = () => {
  const { animeId } = useParams<{ animeId: string }>();
  const { combinedAnimeList } = useAnime();
  const { user, fetchUserLikedDislikedAnimes } = useAuth();
  const { fetchComments } = useFirebase();
  const [scrollY, setScrollY] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const anime = combinedAnimeList.find(
    (anime: Anime) => anime.mal_id === Number(animeId)
  );
  const bannerImageBg = useAnilistBannerImage(anime);
  const backgroundColor = scrollY > 150 ? "0.1" : 1;

  useEffect(() => {
    const fetchLikeCount = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      let count = 0;
      usersSnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        const data = doc.data();
        if (data.likedAnimes && data.likedAnimes.includes(animeId)) {
          count++;
        }
      });
      setLikeCount(count);
    };
    fetchLikeCount();
  }, [animeId]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchComments(animeId || "");
  }, [animeId, fetchComments]);

  useEffect(() => {
    const fetchLikedDislikedStatus = async () => {
      if (user && animeId) {
        const { likedAnimes, dislikedAnimes } =
          await fetchUserLikedDislikedAnimes(user.uid);
        setLiked(likedAnimes.includes(animeId));
        setDisliked(dislikedAnimes.includes(animeId));
      }
    };
    fetchLikedDislikedStatus();
  }, [user, animeId, fetchUserLikedDislikedAnimes]);

  if (!anime) {
    return <Loader actionLabel="fetching..." />;
  }

  return (
    <SingleAnimePageContainer maxWidth={false}>
      <UnderlayBackgroundBox
        component="div"
        style={{
          backgroundImage: `
          linear-gradient(to right, #000000 11%, rgba(0, 0, 0, 0.466) 50%),
            linear-gradient(to top, #0c0c0cff 1%, #00000000 20%),
            url(${bannerImageBg || anime.images.jpg.large_image_url})
          `,
          opacity: backgroundColor,
        }}
      />
      <SingleAnimeCard anime={anime} />
      <SingleAnimeData anime={anime} />
      <SingleAnimeActionBtns
        anime={anime}
        liked={liked}
        disliked={disliked}
        setLiked={setLiked}
        setDisliked={setDisliked}
        likeCount={likeCount}
        setLikeCount={setLikeCount}
      />
      <CommentSection
        animeId={String(anime.mal_id)}
        liked={liked}
        disliked={disliked}
      />
      <CarouselShowcase carouselLabel={"Recommendations"} />
      <CarouselShowcase carouselLabel={"Relations"} />
      <CarouselShowcase carouselLabel={"Top 25"} />
    </SingleAnimePageContainer>
  );
};

export default SingleAnimePage;
