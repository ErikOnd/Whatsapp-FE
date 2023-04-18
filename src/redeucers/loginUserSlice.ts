import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../actions"
import { IUser } from "../interfaces/IUser";

interface LoginUserState {
    status: string;
    error: string | null;
    user: IUser | null;
}

const initialState: LoginUserState = {
    status: "idle",
    error: null as string | null,
    user: null,
};

const loginUserSlice = createSlice({
    name: "login",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message ? action.error.message : null;
            });
    },
})

export default loginUserSlice.reducer;