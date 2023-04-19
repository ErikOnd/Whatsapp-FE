export interface IMessage {
    senderId: string;
    receiverId: string;
    messageText: string;
    timestamp: Date;
}

export interface IChat {
    participants: string[];
    messages: IMessage[];
}