import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalSlicer {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  language: string;
  globalSearch: string;
}

const initialState: GlobalSlicer = {
  theme: 'light',
  sidebarOpen: true,
  language: 'en',
  globalSearch: '',
};

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { toggleTheme, toggleSidebar, setLanguage } = globalSlice.actions;
export default globalSlice.reducer;
