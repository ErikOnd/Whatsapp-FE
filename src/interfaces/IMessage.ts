import { IUser } from "./IUser";
export interface IMessage {
    sender: IUser | null;
    content: {
        text?: string
        media?: string
    }
    createdAt: string;
    updatedAt: string;
}
