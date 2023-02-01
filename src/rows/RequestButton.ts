import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

export const RequestButton = (
  id: string,
  isDisabled: boolean,
  mediaType: string
) =>
  new ActionRowBuilder<ButtonBuilder>().addComponents([
    new ButtonBuilder()
      .setCustomId(`request-button-${mediaType}-${id}`)
      .setLabel(isDisabled ? 'Already owned' : 'Request')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(isDisabled)
      .setEmoji(
        !isDisabled
          ? '<a:agooglebell:756106280019689593>'
          : '<a:emoji:1010104089192960060>'
      ),
  ]);
