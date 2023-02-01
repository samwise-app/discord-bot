export interface ThreadDetails {
  hostChannel: string;
  starterMessage: string;
}
export interface Data {
  createdAt: Date;
  channelName: string;
  message: string;
  sender: string;
  threadDetails: ThreadDetails | null;
  images: string[] | null;
}

export enum ActionType {
  new = 'new',
  update = 'update',
  reaction = 'reaction',
}

export type MediaArray = Movie[] | Book[] | TVShow[];

interface MovieRating {
  votes: number;
  value: number;
  type: string;
}

interface MovieRatings {
  imdb: MovieRating;
  tmdb: MovieRating;
  rottenTomatoes: MovieRating;
}
export interface Movie {
  title: string;
  imdbId: string;
  searchId: string; // My own property to use for searching
  overview: string;
  year: number;
  ratings: MovieRatings;
  remotePoster: string;
  youTubeTrailerId: string;
  genres: string[];
  hasFile: boolean;
}
export interface TVShow {
  title: string;
  imdbId: string;
  searchId: string; // My own property to use for searching
  overview: string;
  year: number;
  remotePoster: string;
  genres: string[];
  path?: string;
}
export interface Book {
  title: string;
  searchId: string;
}
