import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreState {
  chatNumber: number;
  setChatNumber: (chatNumber: number) => void;
  activeChatId: string;
  setActiveChatId: (chatId: string) => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        chatNumber: 0,
        setChatNumber: (chatNumber) => set(() => ({ chatNumber })),
        activeChatId: '',
        setActiveChatId: (chatId) => set(() => ({ activeChatId: chatId })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
);
