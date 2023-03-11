'use client';
import {
  PlusCircleIcon,
  MinusCircleIcon,
  ArrowCircleLeftIcon,
} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { Button, TextArea, ChatPost, ChatId } from '@/components';
import { db } from '@/utils';

export default function Home() {
  const { data: session } = useSession();
  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, 'users', session?.user?.email!, 'chats'),
        orderBy('createdAt', 'desc')
      )
  );

  return (
    <main className='w-screen h-screen relative overflow-hidden'>
      <div className='flex h-full flex-1 flex-col md:pl-[260px]'>
        <main className='h-screen flex flex-col justify-between'>
          <div className='flex flex-col pt-2 overflow-y-auto'>
            {/* {chats?.docs.map((chat, index) => (
              <ChatPost
                key={index}
                name={chat.name}
                message={chat.message}
                uniqueId={chat.id}
              />
            ))} */}
          </div>
          <TextArea />
        </main>

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
          <div className='mt-8'>
            {chats?.docs.map((chat, index) => (
              <ChatId key={index} uniqueId={chat.id} />
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
