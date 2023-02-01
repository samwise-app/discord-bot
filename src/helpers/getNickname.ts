import { Interaction, GuildMember } from 'discord.js';

// Swaps my Discord Name for my nickname
export const getNickname = (interaction: Interaction) => {
  const member = interaction.member as GuildMember;
  return member.nickname ? member.nickname : interaction.user.username;
};
