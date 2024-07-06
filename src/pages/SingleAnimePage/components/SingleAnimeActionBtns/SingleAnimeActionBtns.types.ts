import { Anime } from "../../../../types/Anime";

export interface SingleAnimeActionBtnsProps {
  anime: Anime;
  liked: boolean;
  disliked: boolean;
  setLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setDisliked: React.Dispatch<React.SetStateAction<boolean>>;
  likeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
}
