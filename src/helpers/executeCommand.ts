
import { ChatInputCommandInteraction } from 'discord.js';
import { channelIdsMap } from '../lib/constants';
import client from '../lib/discordClient';
import { catchError } from './errorHandler';
import { getNickname } from './getNickname';

export const executeCommand = async (
  interaction: ChatInputCommandInteraction
) => {
  const command = client.commands.get(interaction.commandName);

  const sender = getNickname(interaction);
  if (!command) {
    catchError(`No command matching ${interaction.commandName} was found.`, {
      sender,
      message: `/${interaction.commandName}`,
      channel: channelIdsMap[interaction.channelId] || interaction.channelId,
    });
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
    catchError(
      `There was an error while executing ${interaction.commandName}.`,
      {
        sender,
        message: `/${interaction.commandName}`,
        channel: channelIdsMap[interaction.channelId] || interaction.channelId,
      }
    );
  }
};
