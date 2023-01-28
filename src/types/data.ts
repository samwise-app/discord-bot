export interface Data {
  createdAt: Date;
  channelName: string;
  message: string;
  sender: string;
  images: string[] | null;
}

export enum ActionType {
  new = 'new',
  update = 'update',
  reaction = 'reaction',
}
