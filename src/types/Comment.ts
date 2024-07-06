export interface Comment {
  id: string;
  userId: string;
  comment: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  };
}
