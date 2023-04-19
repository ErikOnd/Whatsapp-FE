interface ChatState {
  selectedChat: number | null;
}

const initialState: ChatState = {
  selectedChat: null,
};

const selectChatReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SELECT_CHAT":
      return {
        ...state,
        selectedChat: action.payload,
      };
    default:
      return state;
  }
};
export default selectChatReducer;
