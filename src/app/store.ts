// ✅ Global state management - Zustand is lightweight and performant
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppStore {
  isDarkMode: boolean;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    }),
    {
      name: 'app-store', // Persists to localStorage
    }
  )
);
