import axios from 'axios';
import { sonarrApiKey, sonarrUrl } from '../lib/constants';
import { TVShow } from '../types/data';

export const getShowsFromString = async (show: string): Promise<TVShow[]> => {
  return await axios
    .get(`${sonarrUrl}/api/v3/series/lookup?term=${show}`, {
      headers: {
        'X-Api-Key': sonarrApiKey,
      },
    })
    .then(
      (response) =>
        response.data.slice(0, 10).map((show: TVShow) => {
          return { ...show, searchId: show.imdbId };
        }) as TVShow[]
    );
};

export const addShow = async (show: TVShow) => {
  const postData = {
    ...show,
    ...postOptions(show),
  } as Partial<TVShow>;
  delete postData.searchId;
  console.log(postData);
  return await axios.post(`${sonarrUrl}/api/v3/series`, postData, {
    headers: {
      'X-Api-Key': sonarrApiKey,
    },
  });
};

const postOptions = (show: TVShow) => ({
  languageProfileId: 1,
  monitored: true,
  rootFolderPath: '/data/media/TV',
  path: `/data/media/TV/${show.title}`,
  qualityProfileId: 4, // This is the quality profile ID for 1080p
  tags: [],
  addOptions: {
    searchForMissingEpisodes: true,
    searchForCutoffUnmetEpisodes: false,
    ignoreEpisodesWithFiles: false,
    ignoreEpisodesWithoutFiles: false,
    monitor: 'all',
  },
});
