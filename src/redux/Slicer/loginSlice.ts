"use client"

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  token: string | null;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  token: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = loginSlice.actions;
export default loginSlice.reducer;
