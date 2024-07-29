import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import localStorage from 'redux-persist/es/storage';
import { authSlice, resetStore } from '../features/auth/slice';
import { isDev } from './environment.ts';

const rootPersistConfig = {
  key: 'root',
  blacklist: [api.reducerPath, authSlice.name],
  storage: localStorage
};

const authPersistConfig = {
  key: authSlice.name,
  storage: localStorage
};

const appReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [authSlice.name]: persistReducer(authPersistConfig, authSlice.reducer)
});

export const rootReducer: typeof appReducer = (state, action) => {
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  devTools: isDev(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(api.middleware)
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
