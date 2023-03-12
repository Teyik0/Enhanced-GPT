import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreState {
  activeChatId: string;
  setActiveChatId: (chatId: string) => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        activeChatId: '',
        setActiveChatId: (chatId) => set(() => ({ activeChatId: chatId })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
);
