import { BotChatChannelId } from '../lib/constants';
import { client } from '../lib/discordClient';
import { Data } from '../types/data';

export const catchError = (error: string, data?: Data) => {
  const channel = client.channels.cache.get(BotChatChannelId);
  if (channel && data) {
    //@ts-ignore - send clearly is a method on channel but typescript doesn't know that
    channel.send(
      `Oh no! There was a problem with this message from ${data.sender}:  \`\`\`${data.message}\`\`\` `,
      error
    );
  } else if (channel) {
    //@ts-ignore - send clearly is a method on channel but typescript doesn't know that
    channel.send(`Oh no! There was a problem:  \`\`\`${error}\`\`\` `, error);
  }
};
