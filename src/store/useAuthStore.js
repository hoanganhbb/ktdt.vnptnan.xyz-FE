import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      appBuildVersion: null,

      // Actions
      setUser: user => set({ user }),

      setAccessToken: token => set({ accessToken: token }),

      setAppBuildVersion: version => set({ appBuildVersion: version }),

      login: userData => {
        set({ user: userData });
      },

      logout: () => {
        set({ user: null, accessToken: null });
      },

      clearAll: () => {
        set({ user: null, accessToken: null, appBuildVersion: null });
        localStorage.clear();
        sessionStorage.clear();
      },

      // Getters
      getUser: () => get().user,
      getAccessToken: () => get().accessToken,
      getAppBuildVersion: () => get().appBuildVersion,
      isAuthenticated: () => !!get().accessToken
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // use localStorage
      partialize: state => ({
        user: state.user,
        accessToken: state.accessToken,
        appBuildVersion: state.appBuildVersion
      })
    }
  )
);

export default useAuthStore;
