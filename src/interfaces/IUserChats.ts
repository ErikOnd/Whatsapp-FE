export interface IUserChats {
  _id: string;
  participants: Participant[];
  messages: Message[];
  __v: number;
}

interface Participant {
  _id: string;
  username: string;
  avatar: string;
}

export interface Message {
  senderId: string;
  receiverId: string;
  messageText: string;
  timestamp: string;
  _id: string;
}
