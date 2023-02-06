import { AttachmentBuilder, EmbedBuilder } from 'discord.js';

export const greencircle = new AttachmentBuilder(
  '/home/me/coding/samwise-discord-bot/src/assets/green_circle.png'
);
export const greenrect = new AttachmentBuilder(
  '/home/me/coding/samwise-discord-bot/src/assets/green_rect.png'
);
export const redcircle = new AttachmentBuilder(
  '/home/me/coding/samwise-discord-bot/src/assets/red_circle.png'
);
export const redrect = new AttachmentBuilder(
  '/home/me/coding/samwise-discord-bot/src/assets/red_rect.png'
);

const generateHeartbeatEmbed = (
  title: string,
  url: string,
  hasHeartbeat: boolean
) =>
  new EmbedBuilder()
    .setColor(hasHeartbeat ? 0x00ff22 : 0xff0000)
    .setTitle(title)
    // .addFields(
    //   { name: 'Inline field title', value: '\u200b', inline: true },
    //   { name: 'Inline field title', value: '\u200b', inline: true },
    //   { name: 'Inline field title', value: '\u200b', inline: true }
    // )
    .setURL(url)
    .setImage(
      hasHeartbeat ? 'attachment://green_rect.png' : 'attachment://red_rect.png'
    );
// .setThumbnail(
//   hasHeartbeat
//     ? 'attachment://green_circle.png'
//     : 'attachment://red_circle.png'
// )
// .setTimestamp();

export interface HeartbeatEmbed {
  color: number;
  title: string;
  url: string;
  description?: string;
  image: {
    url: string;
  };
  thumbnail: {
    url: string;
  };
}

export interface HeartbeatMessage {
  embeds: EmbedBuilder[];
  files: AttachmentBuilder[];
}

export interface HeartbeatResonse {
  hasHeartbeat: boolean;
  message: HeartbeatMessage;
}

const generateEmbed = (
  title: string,
  url: string,
  hasHeartbeat: boolean
): HeartbeatResonse => {
  const embed = generateHeartbeatEmbed(title, url, hasHeartbeat);
  return hasHeartbeat
    ? {
        hasHeartbeat: true,
        message: {
          embeds: [embed],
          files: [greenrect],
        },
      }
    : {
        hasHeartbeat: false,
        message: {
          embeds: [embed],
          files: [redrect],
        },
      };
};

export default generateEmbed;
