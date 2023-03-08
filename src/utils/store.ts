import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface StoreState {
  newQuestion: string;
  setNewQuestion: (question: string) => void;
  newAnswer: string;
  setNewAnswer: (answer: string) => void;
  allConversation: { name: string; message: string }[];
  setAllConversation: () => void;
  clearAllConversation: () => void;
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        newQuestion: '',
        setNewQuestion: (question) =>
          set((state) => ({ newQuestion: question })),
        newAnswer: '',
        setNewAnswer: (answer) => set((state) => ({ newAnswer: answer })),
        allConversation: [],
        setAllConversation: () =>
          set((state) => ({
            allConversation: [
              ...state.allConversation,
              { name: 'Me', message: state.newQuestion },
              { name: 'Bot', message: state.newAnswer },
            ],
          })),
        clearAllConversation: () => set((state) => ({ allConversation: [] })),
      }),
      {
        name: 'bear-storage',
      }
    )
  )
);
