import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import { loginUser } from "../../actions";
import getMyProfileReducer from "../../redeucers/getMyProfileReducer";
import selectChatReducer from "../../redeucers/selectChatReducer";
import fetchAllUsersReducer from "../../redeucers/getAllUsersReducer";
import chatReducer from "../../redeucers/chatReducer";


const combinedReducers = combineReducers({
  login: loginUser,
  myProfile: getMyProfileReducer,
  selectChat: selectChatReducer,
  allUsers: fetchAllUsersReducer,
  selectedChat: chatReducer

});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
