"use client";
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./Slicer/loginSlice";
import userReducer from "./Slicer/userSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
