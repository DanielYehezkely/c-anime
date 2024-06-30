// export interface MainPicture {
//   medium?: string;
//   large?: string;
// }

// export interface AnimeNode {
//   id: number;
//   title: string;
//   main_picture: MainPicture;
// }

// interface Genre {
// id: number;
// name: string;

// }


// export interface AnimeApiResponse {
//   data: { node: AnimeNode }[]; 
// }

// export interface AnimeDetails {
//   id: number;
//   title: string;
//   main_picture: MainPicture;
//   start_date: string;
//   end_date: string;
//   synopsis: string;
//   mean: number;
//   rank: number;
//   popularity: number;
//   num_list_users: number;
//   num_scoring_users: number;
//   nsfw: string;
//   created_at: string;
//   updated_at: string;
//   media_type: string;
//   status: string;
//   genres: Genre[];
//   num_episodes: number;
//   source: string;
//   average_episode_duration: number;
//   rating: string;
//   pictures: MainPicture[];
//   background: string;
// }


interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

interface ImageUrls {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: ImageUrls;
}

interface Aired {
  from: string;
  to: string;
  prop: {
    from: { day: number; month: number; year: number };
    to: { day: number; month: number; year: number };
  };
  string: string;
}

interface EntityInfo {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: {
    jpg: ImageUrls;
    webp: ImageUrls;
  };
  trailer: Trailer;
  approved: boolean;
  titles: { type: string; title: string }[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: Aired;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: EntityInfo[];
  licensors: EntityInfo[];
  studios: EntityInfo[];
  genres: EntityInfo[];
  explicit_genres: EntityInfo[];
  themes: EntityInfo[];
  demographics: EntityInfo[];
}

export interface AnimeResponse {
  pagination: Pagination;
  data: Anime[];
}