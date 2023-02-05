import { SlashCommandBuilder } from 'discord.js';
import { nodeEnvironment } from '../lib/constants';

module.exports = {
  data: new SlashCommandBuilder()
    .setName(nodeEnvironment === 'dev' ? 'dev-ping' : 'ping')
    .setDescription('Replies with Pong!'),
  async execute(interaction: any) {
    await interaction.reply('Pong!');
  },
};
