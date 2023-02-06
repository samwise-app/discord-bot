import { Events, TextChannel } from 'discord.js';
import client from 'src/lib/discordClient';

client.once(Events.ClientReady, async (c: any) => {
  console.log(`Starting the heartbeat module...`);
  await heartbeat().then((embed) => {
    (client.channels.cache.get('1066131583087685693') as TextChannel).send(
      embed.message
    );
  });
});
