import { Events, Message, TextChannel } from 'discord.js';
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
import axios from 'axios';
import generateEmbed from './modules/heartbeat/embeds/Heartbeat';

client.once(Events.ClientReady, async (c: any) => {
  console.log(`Ready! Logged in as ${c.user.tag}!`);
  await heartbeat().then((embed) => {
    (client.channels.cache.get('1066131583087685693') as TextChannel).send(
      embed.message
    );
  });
});

const heartbeat = async () => {
  return await axios
    .get('http://localhost:5173', {
      headers: {
        accept: '*/*',
        'user-agent': 'curl/7.79.1',
      },
      timeout: 5000, // it has a habit of timing out
    })
    .then((response) =>
      generateEmbed(
        'Heartbeat Test',
        'http://192.168.30.103:5173/',
        response.data ? true : false
      )
    )
    .catch(() =>
      generateEmbed('Heartbeat Test', 'http://192.168.30.103:5173/', false)
    );
};

client.login(DiscordToken);

const doTheHeartbeat = (message: Message) => {
  setInterval(async () => {
    await heartbeat().then((newMessage) => {
      message.edit(newMessage.message);
      if (!newMessage.hasHeartbeat && !message.thread) {
        message.startThread({
          name: 'Service Down',
          autoArchiveDuration: 60,
        });
      } else if (newMessage.hasHeartbeat && message.thread) {
        message.thread?.delete();
      }
    });
  }, 5 * 1000);
};

client.on(Events.MessageCreate, async (message) => {
  const data = await parseSentMessage(message);
  channelReducer(ActionType.new, data);
  if (message.channelId === '1066131583087685693') {
    doTheHeartbeat(message);
  }
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
