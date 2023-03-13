'use client';
import { useState, useEffect } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import { ChatIcon, TrashIcon, PencilAltIcon } from '@heroicons/react/outline';
import { db, useStore } from '@/utils';
import { toast } from 'react-hot-toast';
import { useCollection } from 'react-firebase-hooks/firestore';

interface ChatIdProps {
  uniqueId: string;
  chat: DocumentData;
}

const ChatId = ({ uniqueId, chat }: ChatIdProps) => {
  const [modifyChatName, setModifyChatName] = useState(false);
  const [chatName, setChatName] = useState(chat.data().chatName);
  const { data: session } = useSession();
  const { activeChatId, setActiveChatId, chatNumber } = useStore();
  const selectChat = () => {
    setActiveChatId(uniqueId);
  };
  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          'users',
          session?.user?.email!,
          'chats',
          activeChatId,
          'messages'
        )
      )
  );

  const modifyChatValue = async () => {
    await updateDoc(
      doc(db, 'users', session?.user?.email!, 'chats', uniqueId),
      {
        chatName: chatName,
      }
    );
    setModifyChatName(false);
  };

  const removeChat = async () => {
    if (chatNumber > 1) {
      messages?.docs.forEach(async (message) => {
        await deleteDoc(
          doc(
            db,
            'users',
            session?.user?.email!,
            'chats',
            uniqueId,
            'messages',
            message.id
          )
        );
      });
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
      {!modifyChatName ? (
        <span className='mr-auto'>{chat.data().chatName}</span>
      ) : (
        <input
          className='bg-transparent outline-none w-[120px] mr-auto rounded-sm px-2'
          type='text'
          value={chatName}
          onChange={(e) => setChatName(e.target.value)}
        />
      )}
      <PencilAltIcon
        onClick={() => {
          if (modifyChatName) {
            modifyChatValue();
          } else {
            setModifyChatName(true);
          }
        }}
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
