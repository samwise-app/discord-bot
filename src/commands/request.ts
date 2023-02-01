import {
  ActionRowBuilder,
  SlashCommandBuilder,
  StringSelectMenuBuilder,
} from 'discord.js';

import { MediaArray } from '../types/data';
import { getMoviesFromString } from '../api/radarr';
import { getShowsFromString } from '../api/sonarr';

module.exports = {
  data: new SlashCommandBuilder()
    .setName('request')
    .setDescription('Requests media to be added to the library.')
    .addStringOption((option) =>
      option
        .setName('category')
        .setRequired(true)
        .setDescription('The category of media to request.')
        .addChoices(
          {
            name: 'Movie',
            value: 'movie',
          },
          { name: 'TV Show', value: 'tv' }
          // { name: 'Book', value: 'book' }
        )
    )
    .addStringOption((option) =>
      option
        .setName('title')
        .setRequired(true)
        .setDescription('The title of the media to request.')
    ),
  async execute(interaction: any) {
    const category = interaction.options.getString('category');
    const title = interaction.options.getString('title');
    let searchResults: MediaArray = [];
    switch (category) {
      case 'movie':
        searchResults = await getMoviesFromString(title);
        break;
      case 'tv':
        searchResults = await getShowsFromString(title);
        break;
      // case 'book':
      //   searchResults = await getBook(title);
      //   break;
      default:
        break;
    }
    const row = rowBuilder(searchResults, category);
    await interaction.reply({
      content: 'Choose one of the following results:',
      ephemeral: true,
      components: [row],
    });
  },
};

// const getBook = async (book: string): Promise<Book[]> => {
//   return [
//     { title: 'The Odyssey', searchId: '1' },
//     { title: 'Scarlet Letter', searchId: '2' },
//     { title: 'The Fellowship of the Ring', searchId: '3' },
//   ];
// };

const rowBuilder = (
  searchResults: MediaArray,
  mediaType: string
): ActionRowBuilder => {
  const options = searchResults.map((result) => ({
    label: result.title,
    value: result.searchId || result.title,
  }));
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId(`select-media-${mediaType}`)
      .setPlaceholder('Nothing selected')
      .addOptions(options)
  );
};
