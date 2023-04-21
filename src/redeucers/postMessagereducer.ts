import { ADD_MESSAGE } from "../actions";
import { IMessage } from "../interfaces/IChat";

export interface ChatMsgState {
    messages: IMessage[];
}

const initialState: ChatMsgState = {
    messages: [],
};

const postMessageReducer = (state = initialState, action: any): ChatMsgState => {
    switch (action.type) {
        case ADD_MESSAGE:
            const { senderId, receiverId, messageText } = action.payload;
            const newMessage: IMessage = { senderId, receiverId, messageText }
            return {
                ...state,
                messages: [...state.messages, newMessage],
            };
        default:
            return state;
    }
};

export default postMessageReducer;