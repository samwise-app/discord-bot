import { createClient } from '@supabase/supabase-js';
import { catchError } from '../helpers/errorHandler';
import { supabaseKey, supabaseUrl } from './constants';

export const supabase = supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : catchError('No supabase key found');
