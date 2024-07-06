import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Anime } from "../../types/Anime";
import getAnimeBannerByTitle from "../../services/animeMalApi/animeAnilistService";
import {
  getDoc,
  getDocs,
  doc,
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

const SingleAnimePage: React.FC = () => {
  const { animeId } = useParams<{ animeId: string }>();
  const { combinedAnimeList } = useAnime();
  const { user, fetchUserLikedDislikedAnimes } = useAuth();
  const [bannerImageBackground, setBannerImageBackground] = useState<
    string | null
  >(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [comments, setComments] = useState<any[]>([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const anime = combinedAnimeList.find(
    (anime: Anime) => anime.mal_id === Number(animeId)
  );

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
    const fetchAnimeBannerImage = async (): Promise<void> => {
      if (anime) {
        const bannerImg = await getAnimeBannerByTitle(anime);
        setBannerImageBackground(bannerImg);
      }
    };
    fetchAnimeBannerImage();
  }, [anime]);

  useEffect(() => {
    const fetchComments = async () => {
      if (animeId) {
        const commentsRef = doc(db, "comments", animeId);
        const commentsDoc = await getDoc(commentsRef);
        if (commentsDoc.exists()) {
          setComments(commentsDoc.data().comments);
        }
      }
    };
    fetchComments();
  }, [animeId]);

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

  const backgroundColor = scrollY > 150 ? "0.1" : 1;

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
            url(${bannerImageBackground || anime.images.jpg.large_image_url})
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
        comments={comments}
        setComments={setComments}
        liked={liked}
        disliked={disliked}
      />
      <CarouselShowcase carouselLabel={"Recommendations"} />
      <CarouselShowcase carouselLabel={"Relations"} />
    </SingleAnimePageContainer>
  );
};

export default SingleAnimePage;
