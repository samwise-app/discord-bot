require('dotenv').config();

export const GeneralChatChannelId = process.env.GENERAL_CHAT || '';
export const HomeDecorChannelId = process.env.HOME_DECOR_CHAT || '';
export const HouseHuntingChannelId = process.env.HOUSE_HUNTING_CHAT || '';
export const ShoppingListChannelId = process.env.SHOPPING_LIST_CHAT || '';
export const KidStoriesChannelId = process.env.KID_STORIES_CHAT || '';
export const BotChatChannelId = process.env.BOT_CHAT || '';
export const BotTestChannelId = process.env.BOT_TEST_CHAT || '';
export const dID = process.env.D_ID || '';
export const sID = process.env.S_ID || '';
export const DiscordToken = process.env.DISCORD_TOKEN || '';
export const supabaseUrl = process.env.SUPABASE_URL || '';
export const supabaseKey = process.env.SUPABASE_KEY || '';
export const dRealName = process.env.D_REAL_NAME || '';
export const dUserName = process.env.D_USER_NAME || '';
export const serverName = process.env.SERVER_NAME || '';
export const adminID = dID;
export const radarrUrl = process.env.RADARR_URL || '';
export const radarrApiKey = process.env.RADARR_API_KEY || '';
export const sonarrUrl = process.env.SONARR_URL || '';
export const sonarrApiKey = process.env.SONARR_API_KEY || '';
export const nodeEnvironment = process.env.NODE_ENV || '';

type ChannelMapType = {
  [key: string]: string;
};
export const channelIdsMap: ChannelMapType = {
  [GeneralChatChannelId!]: 'general',
  [HomeDecorChannelId!]: 'home-decor',
  [HouseHuntingChannelId!]: 'house-hunting',
  [ShoppingListChannelId!]: 'shopping-list',
  [KidStoriesChannelId!]: 'kid-stories',
  [BotChatChannelId!]: 'bot-chat',
  [BotTestChannelId!]: 'bot-test',
};
