import { ButtonInteraction, StringSelectMenuInteraction } from 'discord.js';
import { addMovie, getMoviesFromString } from '../../api/radarr';
import { addShow, getShowsFromString } from '../../api/sonarr';
import generateMovieEmbed from '../../embeds/Movie';
import generateShowEmbed from '../../embeds/Shows';

import { RequestButton } from '../../rows/RequestButton';
import { getNickname } from '../getNickname';

export const buttonRequestReducer = async (interaction: ButtonInteraction) => {
  const username = getNickname(interaction);
  const searchId = interaction.customId.replace('request-button-', '');
  if (searchId.startsWith('movie-')) {
    const movieId = searchId.replace('movie-', '');
    const movie = await getMoviesFromString(`imdb:${movieId}`);
    const response = await addMovie(movie[0]);
    if (response)
      await interaction.update({
        content: 'The movie has been requested!',
        components: [],
        embeds: [],
      });
    interaction.channel?.send(
      `${movie[0].title} (${movie[0].year}) has been requested by ${username}`
    );
  }
  if (searchId.startsWith('show-')) {
    const showId = searchId.replace('show-', '');
    const show = await getShowsFromString(`imdb:${showId}`);
    const response = await addShow(show[0]);
    if (response)
      await interaction.update({
        content: 'The show has been requested!',
        components: [],
        embeds: [],
      });
    interaction.channel?.send(
      `${show[0].title} has been requested by ${username}`
    );
  }
};

export const selectRequestReducer = async (
  interaction: StringSelectMenuInteraction,
  mediaType: string
) => {
  if (mediaType === 'movie') {
    const [movieInfo] = await getMoviesFromString(
      `imdb:${interaction.values[0]}`
    );
    const movieEmbed = generateMovieEmbed(movieInfo);
    await interaction.update({
      content: 'Request this movie?',
      embeds: [movieEmbed],
      components: [
        RequestButton(movieInfo.searchId, movieInfo.hasFile, 'movie'),
      ],
    });
  } else if (mediaType === 'tv') {
    const [showInfo] = await getShowsFromString(
      `imdb:${interaction.values[0]}`
    );
    const showEmbed = generateShowEmbed(showInfo);
    const alreadyRequested = showInfo.path ? true : false;
    await interaction.update({
      content: 'Request this show?',
      embeds: [showEmbed],
      components: [RequestButton(showInfo.searchId, alreadyRequested, 'show')],
    });
  }
};
