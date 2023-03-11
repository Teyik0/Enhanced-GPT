'use client';

import { useState } from 'react';
import { useStore } from '@/utils/store';
import { signOut, useSession } from 'next-auth/react';
import { Loader } from '@/components';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/utils';

interface ButtonProps {
  name: string;
  icon: any;
  method?: string;
}

const Button = ({ name, icon, method }: ButtonProps) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const { setActiveChatId } = useStore();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (method === 'newchat') {
      setLoading(true);
      const doc = await addDoc(
        collection(db, 'users', session?.user?.email!, 'chats'),
        {
          userId: session?.user?.email!,
          createdAt: serverTimestamp(),
          chatName: 'New chat',
        }
      );
      setLoading(false);
      setActiveChatId(doc.id);
    } else if (method === 'logout') {
      setLoading(true);
      signOut();
    }
  };
  return (
    <button
      className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 
        text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20 w-full h-fit'
      onClick={handleClick}
    >
      <>{icon}</>
      <span className='mr-auto'>{name}</span>
      {loading && <Loader size='little' />}
    </button>
  );
};

export default Button;
