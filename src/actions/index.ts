import { Dispatch } from "redux";
import { createAsyncThunk } from '@reduxjs/toolkit';
export const SET_USER = 'SET_USER'

export const postUserAction = (user: {
  username: string;
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BE_URL}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.log("posted");
        let data = response.json();
        return data;
      } else {
        console.log("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUser = createAsyncThunk(
  "login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await fetch(`${process.env.REACT_APP_BE_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.user;
  }
);
