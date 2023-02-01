import axios from 'axios';
import { radarrApiKey, radarrUrl } from '../lib/constants';
import { Movie } from '../types/data';

export const getMoviesFromString = async (movie: string): Promise<Movie[]> => {
  return await axios
    .get(`${radarrUrl}/api/v3/movie/lookup?term=${movie}`, {
      headers: {
        'X-Api-Key': radarrApiKey,
      },
    })
    .then(
      (response) =>
        response.data.slice(0, 10).map((movie: Movie) => {
          return { ...movie, searchId: movie.imdbId };
        }) as Movie[]
    );
};

export const addMovie = async (movie: Movie) => {
  const postData = {
    ...movie,
    ...postOptions(movie),
  } as Partial<Movie>;
  delete postData.searchId;
  return await axios.post(`${radarrUrl}/api/v3/movie`, postData, {
    headers: {
      'X-Api-Key': radarrApiKey,
    },
  });
};

const postOptions = (movie: Movie) => ({
  id: 0, // This doesn't seem to matter - defaults to 0 so I kept it
  monitored: true,
  rootFolderPath: '/data/media/Movies',
  folder: `${movie.title} (${movie.year})`,
  qualityProfileId: 4, // This is the quality profile ID for 1080p
  minimumAvailability: 'released',
  tags: [],
  addOptions: { monitor: 'movieOnly', searchForMovie: true },
});
