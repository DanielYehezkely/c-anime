export interface MainPicture {
  medium?: string;
  large?: string;
}

export interface AnimeNode {
  id: number;
  title: string;
  main_picture: MainPicture;
}


export interface AnimeApiResponse {
  data: { node: AnimeNode }[]; 
}
