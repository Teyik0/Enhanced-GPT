import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreState {
  newQuestion: string;
  setNewQuestion: (question: string) => void;
  activeChatId: string;
  setActiveChatId: (chatId: string) => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set) => ({
        newQuestion: '',
        setNewQuestion: (question) => set(() => ({ newQuestion: question })),
        activeChatId: '',
        setActiveChatId: (chatId) => set(() => ({ activeChatId: chatId })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
);
