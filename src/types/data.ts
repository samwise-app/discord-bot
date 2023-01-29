export interface ThreadDetails {
  hostChannel: string;
  starterMessage: string;
}
export interface Data {
  createdAt: Date;
  channelName: string;
  message: string;
  sender: string;
  threadDetails: ThreadDetails | null;
  images: string[] | null;
}

export enum ActionType {
  new = 'new',
  update = 'update',
  reaction = 'reaction',
}
