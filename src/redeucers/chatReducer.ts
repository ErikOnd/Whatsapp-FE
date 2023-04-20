import { CREATE_CHAT_FAIL, CREATE_CHAT_SUCCESS } from "../actions";

export interface ChatState {
    chat: string | null;
    error: string | null;
}


const initialState: ChatState = {
    error: null,
    chat: null,
};

const chatReducer = (
    state = initialState,
    action: any
): ChatState => {
    switch (action.type) {
        case CREATE_CHAT_SUCCESS:
            return {
                ...state,
                chat: action.payload,
                error: null,
            };
        case CREATE_CHAT_FAIL:
            return {
                ...state,
                chat: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default chatReducer;