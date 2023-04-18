import { IUser } from "./IUser";
import { IMessage } from "./IMessage";
export interface IChat {
    members: IUser[];
    messages: IMessage[];

}
