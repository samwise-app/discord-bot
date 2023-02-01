import { TextChannel } from 'discord.js';
import { BotChatChannelId } from '../lib/constants';
import client from '../lib/discordClient';

interface ErrorData {
  sender: string;
  message: string;
  channel: string;
}
export const catchError = (error: string, data?: ErrorData) => {
  const channel = client.channels.cache.get(BotChatChannelId) as TextChannel;
  if (channel && data) {
    channel.send(
      `Oh no! There was a problem with this message from ${data.sender}:  \`\`\`${data.message}\`\`\` /n ${error} `
    );
  } else if (channel) {
    channel.send(
      `Oh no! There was a problem:  \`\`\`${error}\`\`\` `
    );
  }
};
