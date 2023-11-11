import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { cafeteriaApi } from "../services/api"

export const store = configureStore({
  reducer: {
    [cafeteriaApi.reducerPath]: cafeteriaApi.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
