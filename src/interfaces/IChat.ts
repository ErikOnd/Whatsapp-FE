import { IUser } from "./IUser";
export interface IMessage {
  senderId: string;
  receiverId: string;
  messageText: string;
  timestamp: Date;
}

export interface IChat {
  _id: string;
  participants: IUser[];
  messages: IMessage[];
}
