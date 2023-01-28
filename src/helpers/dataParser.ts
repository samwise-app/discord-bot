import { Message } from 'discord.js';
import { channelIdsMap, dRealName, dUserName } from '../lib/constants';
import { Data } from '../types/data';
import { convertImageToBase64 } from './convertImage';

export const parseSentMessage = async (
  message: Message
): Promise<Data> => {
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

  return {
    createdAt: message.createdAt,
    sender: username,
    channelName: channelIdsMap[message.channelId] || message.channelId,
    message: message.content,
    images: images ? images : null,
  };
};
