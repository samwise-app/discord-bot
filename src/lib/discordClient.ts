import { Client, Collection, GatewayIntentBits } from 'discord.js';
const fs = require('node:fs');
const path = require('node:path');

export interface MyClient extends Client {
  // TODO - change this from 'any'
  commands: Collection<any, any>;
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
}) as MyClient;

client.commands = new Collection();

const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: string) => file.endsWith('.ts'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

export default client;