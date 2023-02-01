import { Message } from 'discord.js';
import { channelIdsMap, dRealName, dUserName } from '../../lib/constants';
import { Data, ThreadDetails } from '../../types/data';
import { convertImageToBase64 } from './convertImage';

export const parseSentMessage = async (message: Message): Promise<Data> => {
  const username =
    // Converts from my username to my real name
    message.author.username === dUserName ? dRealName : message.author.username;

  let images: string[] | null = null;
  if (message.attachments.size > 0) {
    await Promise.allSettled(
      message.attachments.map(async (attachment) => {
        await convertImageToBase64(attachment.url).then((image) => {
          images = images ? [...images, image] : [image];
        });
      })
    );
  }

  const threadDetails = await getThreadDetails(message);
  return {
    createdAt: message.createdAt,
    sender: username,
    channelName: channelIdsMap[message.channelId] || message.channelId,
    threadDetails: threadDetails ? threadDetails : null,
    message: message.content,
    images: images ? images : null,
  };
};

const getThreadDetails = async (
  message: Message
): Promise<void | ThreadDetails> => {
  if (!message.channel.isThread()) return;
  const starterMessage = await message.channel
    .fetchStarterMessage()
    .then((message) => message?.content || '{{no message}}');
  return {
    hostChannel: message.channel.parent?.id || '',
    starterMessage,
  };
};
