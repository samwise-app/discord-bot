import { EmbedBuilder } from 'discord.js';
import { Movie } from '../types/data';

const generateMovieEmbed = (movie: Movie) =>
  new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(movie.title || 'No title found')
    .setURL(`https://www.imdb.com/title/${movie.searchId}/`)
    .setAuthor({
      name: `Released in ${movie.year}`,
    })
    .setDescription(movie.overview)
    .addFields({ name: '\u200B', value: '\u200B' })
    .addFields(
      {
        name: 'IMDB',
        value: movie.ratings.imdb?.value ? `${movie.ratings.imdb.value}` : '-',
        inline: true,
      },
      {
        name: 'TMDB',
        value: movie.ratings.tmdb?.value ? `${movie.ratings.tmdb.value}` : '-',
        inline: true,
      },
      {
        name: 'Rotten Tomatoes',
        value: movie.ratings.rottenTomatoes?.value
          ? `${movie.ratings.rottenTomatoes.value}`
          : '-',
        inline: true,
      }
    )
    .setFields({
      name: 'Genres',
      value: movie.genres.join(', '),
    })
    .setFields({
      name: 'Youtube Trailer',
      value: `https://www.youtube.com/watch?v=${movie.youTubeTrailerId}`,
    })
    .setImage(movie.remotePoster)
    .setTimestamp();

export default generateMovieEmbed;
