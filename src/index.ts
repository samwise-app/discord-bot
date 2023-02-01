import { Events } from 'discord.js';
import { DiscordToken } from './lib/constants';
require('dotenv').config();

import client from './lib/discordClient';
import { parseSentMessage } from './helpers/message-saves/messageParser';
import { channelReducer } from './helpers/message-saves/messageReducerByChannel';
import { ActionType } from './types/data';
import { executeCommand } from './helpers/executeCommand';
import {
  buttonRequestReducer,
  selectRequestReducer,
} from './helpers/media-request/requestReducer';

client.once(Events.ClientReady, (c: any) => {
  console.log(`Ready! Logged in as ${c.user.tag}!`);
});
client.login(DiscordToken);

client.on(Events.MessageCreate, async (message) => {
  const data = await parseSentMessage(message);
  channelReducer(ActionType.new, data);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    executeCommand(interaction);
  }
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId.startsWith('select-media')) {
      const mediaType = interaction.customId.replace('select-media-', '');
      selectRequestReducer(interaction, mediaType);
    }
  }
  if (interaction.isButton()) {
    if (interaction.customId.startsWith('request-button-'))
      buttonRequestReducer(interaction);
  }
});

client.on(Events.MessageUpdate, async (oldMessage, newMessage) => {
  // channelReducer('update', data);
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  // channelReducer('reaction', data);
});
