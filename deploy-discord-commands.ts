// Run this when you want to deploy your new slash commands to a guild

const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
require('dotenv').config();

const {
  DISCORD_TOKEN: token,
  GUILD_ID: guildId,
  CLIENT_ID: clientId,
} = process.env;

const commands: string[] = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs
  .readdirSync('./src/commands')
  .filter((file: string) => file.endsWith('.ts'));

commandFiles.forEach((file: string) => {
  const filePath = `./src/commands/${file}`;
  const command = require(filePath);
  commands.push(command.data.toJSON());
});

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
  try {
    console.log(`Removing old application (/) commands.`);

    await rest
      .put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
      .then(() => console.log('Successfully deleted all guild commands.'))
      .catch(console.error);

    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
