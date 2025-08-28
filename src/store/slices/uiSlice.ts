// UI durumu yönetimi için Redux slice

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  loading: boolean;
  error: string | null;
  activeModal: string | null;
  darkMode: boolean;
  sidebarCollapsed: boolean;
  favoriteTests: string[];
}

const initialState: UIState = {
  loading: false,
  error: null,
  activeModal: null,
  darkMode: false,
  sidebarCollapsed: false,
  favoriteTests: JSON.parse(localStorage.getItem('favoriteTests') || '[]'),
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    setActiveModal: (state, action: PayloadAction<string | null>) => {
      state.activeModal = action.payload;
    },
    
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      // localStorage'da sakla
      localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      // DOM'a uygula
      document.documentElement.classList.toggle('dark', state.darkMode);
    },
    
    initializeDarkMode: (state) => {
      // localStorage'dan okut
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode !== null) {
        state.darkMode = JSON.parse(savedDarkMode);
      } else {
        // Sistem tercihini kontrol et
        state.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // İlk kez belirlenen sistem tercihini kaydet
        localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
      }
      
      // DOM'a uygula
      document.documentElement.classList.toggle('dark', state.darkMode);
    },
    
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    
    toggleFavoriteTest: (state, action: PayloadAction<string>) => {
      const testId = action.payload;
      const index = state.favoriteTests.indexOf(testId);
      
      if (index > -1) {
        state.favoriteTests.splice(index, 1);
      } else {
        state.favoriteTests.push(testId);
      }
      
      localStorage.setItem('favoriteTests', JSON.stringify(state.favoriteTests));
    },
  },
});

export const {
  setLoading,
  setError,
  setActiveModal,
  toggleDarkMode,
  initializeDarkMode,
  toggleSidebar,
  toggleFavoriteTest,
} = uiSlice.actions;

export default uiSlice.reducer;