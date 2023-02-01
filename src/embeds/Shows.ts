import { EmbedBuilder } from 'discord.js';
import { TVShow } from '../types/data';

const generateShowEmbed = (tvShow: TVShow) =>
  new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(tvShow.title || 'No title found')
    .setURL(`https://www.imdb.com/title/${tvShow.searchId}/`)
    .setAuthor({
      name: `Released in ${tvShow.year}`,
    })
    .setDescription(tvShow.overview)
    .addFields({ name: '\u200B', value: '\u200B' })
    .setFields({
      name: 'Genres',
      value: tvShow.genres.join(', '),
    })
    .setImage(tvShow.remotePoster)
    .setTimestamp();

export default generateShowEmbed;
