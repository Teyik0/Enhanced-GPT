'use client';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ChatIcon, TrashIcon, PencilAltIcon } from '@heroicons/react/outline';
import { db, useStore } from '@/utils';
import { toast } from 'react-hot-toast';

interface ChatIdProps {
  uniqueId: string;
}

const ChatId = ({ uniqueId }: ChatIdProps) => {
  const { data: session } = useSession();
  const { activeChatId, setActiveChatId, chatNumber } = useStore();
  const selectChat = () => {
    setActiveChatId(uniqueId);
  };

  const removeChat = async () => {
    if (chatNumber > 1) {
      await deleteDoc(
        doc(db, 'users', session?.user?.email!, 'chats', uniqueId)
      );
      if (uniqueId === activeChatId) {
        const q = query(
          collection(db, 'users', session?.user?.email!, 'chats')
        );
        const querySnapshot = await getDocs(q);
        setActiveChatId(querySnapshot.docs[0].id);
      } else setActiveChatId(activeChatId);
    } else {
      toast.error('You need at least one active chat !', { id: '' });
    }
  };

  return (
    <button
      className={`${
        uniqueId === activeChatId ? 'bg-gray-900' : 'hover:bg-gray-500/10'
      } flex py-3 px-3 items-center gap-3 rounded-md transition-colors duration-200 
    text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20 w-full h-fit`}
      onClick={() => selectChat()}
    >
      <ChatIcon className='h-5 w-5 text-white' />
      <span className='mr-auto'>New chat</span>
      <PencilAltIcon
        onClick={() => console.log('edit')}
        className='h-5 w-5 text-white opacity-5 hover:opacity-60 duration-300 ease-in-out'
      />
      <TrashIcon
        onClick={() => removeChat()}
        className='h-5 w-5 text-white opacity-5 
      hover:text-red-800 hover:opacity-60 duration-300 ease-in-out'
      />
    </button>
  );
};

export default ChatId;
