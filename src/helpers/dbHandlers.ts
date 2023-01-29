import { serverName } from '../lib/constants';
import { supabase } from '../lib/db';
import { Data } from '../types/data';
import { catchError } from './errorHandler';

export const saveToDatabase = async (data: Data) => {
  if (!supabase) return;
  const { error } = await supabase.from(serverName).insert([
    {
      message_created_at: data.createdAt,
      sender: data.sender,
      channel_name: data.channelName,
      thread_details: data.threadDetails,
      message: data.message,
      images: data.images,
    },
  ]);
  if (error) catchError(error.message, data);
};
