export interface Story {
    id: number;
    title: string;
    author: string;
    date: number;
    comments: number;
    rating: number;
    url: string;
    kids?: number[];
    by: string;
    descendants: number,
    score: number,
    time: number,
  }
  