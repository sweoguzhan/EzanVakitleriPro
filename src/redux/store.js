import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import prayerTimesReducer from './prayerTimesSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['prayerTimes'],
};

const rootReducer = combineReducers({
  prayerTimes: prayerTimesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
