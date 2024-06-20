import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppDispatch = typeof store.dispatch;
export const useAsyncDispatch = () => useDispatch<AppDispatch>();

export default store;
