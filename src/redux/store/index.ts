import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import { loginUser } from "../../actions";
import getMyProfileReducer from "../../redeucers/getMyProfileReducer";
import selectChatReducer from "../../redeucers/selectChatReducer";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import fetchAllUsersReducer from "../../redeucers/getAllUsersReducer";
import chatReducer from "../../redeucers/chatReducer";
import postMessageReducer from "../../redeucers/postMessagereducer";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const combinedReducers = combineReducers({
  login: loginUser,
  myProfile: getMyProfileReducer,
  selectChat: selectChatReducer,
  allUsers: fetchAllUsersReducer,
  selectedChat: chatReducer,
  chat: postMessageReducer
});

const store = configureStore({
  reducer: combinedReducers,
  middleware: customizedMiddleware,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
