// Organizes messages by channel to be handled differently if needed.
import {
  BotChatChannelId,
  BotTestChannelId,
  channelIdsMap,
  GeneralChatChannelId,
  HomeDecorChannelId,
  HouseHuntingChannelId,
  KidStoriesChannelId,
  ShoppingListChannelId,
} from '../../lib/constants';
import { ActionType, Data } from '../../types/data';
import { saveToDatabase } from '../dbHandlers';

export const channelReducer = (action: ActionType, data: Data) => {
  switch (data.channelName) {
    case channelIdsMap[BotChatChannelId]:
      return;
    case channelIdsMap[BotTestChannelId]:
      saveToDatabase(data);
      return;
    case channelIdsMap[KidStoriesChannelId]:
      saveToDatabase(data);
      return;
    case channelIdsMap[ShoppingListChannelId]:
      return;
    case channelIdsMap[HouseHuntingChannelId]:
      saveToDatabase(data);
      return;
    case channelIdsMap[HomeDecorChannelId]:
      saveToDatabase(data);
      return;
    case channelIdsMap[GeneralChatChannelId]:
      saveToDatabase(data);
      return;
    default:
      saveToDatabase(data);
      break;
  }
};
