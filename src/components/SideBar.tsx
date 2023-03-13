'use client';

import { useEffect } from 'react';
import { ArrowCircleLeftIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { Button, ChatId, ModelSelection } from '@/components';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db, useStore } from '@/utils';

const SideBar = () => {
  const { data: session } = useSession();
  const { setChatNumber } = useStore();
  const [chats] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'desc')
      )
  );

  useEffect(() => {
    if (chats) setChatNumber(chats!.docs.length);
  }, [chats, setChatNumber]);

  return (
    <aside
      className='hidden md:absolute md:flex md:flex-col 
      inset-y-0 left-0 p-2 h-screen w-[260px] bg-[#202022]'
    >
      <Button
        name='New chat'
        icon={<PlusCircleIcon className='h-5 w-5 text-white' />}
        method='newchat'
      />
      <Button
        name='Logout'
        icon={<ArrowCircleLeftIcon className='h-5 w-5 text-white' />}
        method='logout'
      />
      <ModelSelection />
      <div className='mt-8'>
        {chats?.docs.map((chat, index) => {
          return <ChatId key={index} uniqueId={chat.id} chat={chat} />;
        })}
      </div>
    </aside>
  );
};

export default SideBar;
