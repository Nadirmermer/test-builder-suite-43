// Redux Toolkit store yapılandırması

import { configureStore } from '@reduxjs/toolkit';
import danisanSlice from './slices/danisanSlice';
import testSlice from './slices/testSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    danisanlar: danisanSlice,
    testler: testSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Belirli action'ları yoksay, gerekirse
        ignoredActions: [],
        ignoredPaths: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;