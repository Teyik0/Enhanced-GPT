'use client';

import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { TextArea, SideBar, ChatPost } from '@/components';
import { db, useStore } from '@/utils';

export default function Home() {
  const { data: session } = useSession();
  const { activeChatId } = useStore();
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
        ),
        orderBy('createdAt', 'asc')
      )
  );
  return (
    <main className='w-screen h-screen relative overflow-hidden'>
      <div className='flex h-full flex-1 flex-col md:pl-[260px]'>
        <main className='h-screen flex flex-col justify-between'>
          <div className='flex flex-col py-2 overflow-y-auto overflow-x-hidden'>
            {activeChatId ? (
              messages?.docs.map((message) => (
                <ChatPost
                  key={message.id}
                  message={message.data()}
                  id={message.id}
                />
              ))
            ) : (
              <div className='flex justify-center items-center h-full' />
            )}
          </div>
          <TextArea />
        </main>

        <SideBar />
      </div>
    </main>
  );
}
