import {
  AnyAction,
  configureStore,
  Middleware,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>;
export type AppMiddleware<DispatchExt = {}> = Middleware<
  DispatchExt,
  RootState,
  AppDispatch
>;

export const store = configureStore({reducer: rootReducer});
