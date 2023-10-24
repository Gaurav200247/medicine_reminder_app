import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Slices/Auth/AuthSlice";
import { ReminderAPI } from "./APIs/RemindersAPI";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    [ReminderAPI.reducerPath]: ReminderAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ReminderAPI.middleware),
});
