import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import { cafeteriaApi } from "../services/api"
import { SessionReducer } from "../features/login/sessionSlice";

export const store = configureStore({
  reducer: {
    [cafeteriaApi.reducerPath]: cafeteriaApi.reducer,
    'session': SessionReducer
  },
  middleware: getDefaultMiddleware => 
    getDefaultMiddleware().concat([
      cafeteriaApi.middleware
    ])
});

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
