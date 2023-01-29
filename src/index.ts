import { Events } from 'discord.js';
import { DiscordToken } from './lib/constants';
require('dotenv').config();

import { client } from './lib/discordClient';
import { parseSentMessage } from './helpers/dataParser';
import { channelReducer } from './helpers/channelReducer';
import { ActionType } from './types/data';

client.once(Events.ClientReady, (c: any) => {
  console.log(`Ready! Logged in as ${c.user.tag}!`);
});
client.login(DiscordToken);

client.on('messageCreate', async (message) => {
  message.content === 'ping' && message.reply('Pong!');
  const data = await parseSentMessage(message);
  channelReducer(ActionType.new, data);
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
  // channelReducer('update', data);
});

client.on('messageReactionAdd', async (reaction, user) => {
  // channelReducer('reaction', data);
});
