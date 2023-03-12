'use client';

import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { TextArea, SideBar, ChatPost } from '@/components';
import { db, useStore } from '@/utils';
import { useEffect } from 'react';

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
  useEffect(() => {
    var myDiv = document.getElementById('chat');
    myDiv!.scrollTo({
      top: myDiv!.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <main className='w-screen h-screen relative overflow-hidden'>
      <div className='flex md:flex-1 flex-col md:pl-[260px]'>
        <main className='h-screen flex flex-col justify-between'>
          <div
            className='flex flex-col py-2 overflow-y-auto overflow-x-hidden'
            id='chat'
          >
            {messages &&
              messages.docs.map((message) => (
                <ChatPost
                  message={message.data()}
                  id={message.id}
                  key={message.id}
                />
              ))}
          </div>
          <TextArea />
        </main>

        <SideBar />
      </div>
    </main>
  );
}
