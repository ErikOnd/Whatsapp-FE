import { configureStore } from "@reduxjs/toolkit";

import { combineReducers } from "@reduxjs/toolkit";
import { loginUser } from "../../actions";
import getMyProfileReducer from "../../redeucers/getMyProfileReducer";
import fetchAllUsersReducer from "../../redeucers/fetchAllUserSlice";

const combinedReducers = combineReducers({
  login: loginUser,
  myProfile: getMyProfileReducer,
  users: fetchAllUsersReducer
});

const store = configureStore({
  reducer: combinedReducers,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
