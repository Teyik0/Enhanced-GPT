'use client';

import { useEffect } from 'react';
import { ArrowCircleLeftIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { Button, ChatId } from '@/components';
import { useSession } from 'next-auth/react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db, useStore } from '@/utils';

const SideBar = () => {
  const { data: session } = useSession();
  const { setModel, model, setChatNumber, temperature, setTemperature } =
    useStore();

  const optionStyle = `bg-[#262626] text-white`;
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

      <select
        className='flex bg-transparent py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 
      text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20 w-full h-fit focus:outline-none'
        name='Chat model'
        id='model-selector'
        onChange={(e) => setModel(e.target.value)}
        defaultValue={model}
      >
        <option className={optionStyle}>text-davinci-003</option>
        <option className={optionStyle}>gpt-3.5-turbo</option>
        <option className={optionStyle}>code-davinci-002</option>
        <option className={optionStyle}>text-davinci-002</option>
      </select>

      <div
        className='flex flex-col bg-transparent py-2 rounded-md hover:bg-gray-500/10 transition-colors duration-200 
      text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20 w-full h-fit focus:outline-none px-4'
      >
        <h2 suppressHydrationWarning>Temperature : {temperature}</h2>
        <input
          type='range'
          min='0'
          max='1'
          step='0.1'
          className='mt-2 cursor-pointer w-full'
          onChange={(e) => setTemperature(parseFloat(e.target.value))}
          defaultValue={temperature}
        />
      </div>

      <div className='mt-8'>
        {chats?.docs.map((chat, index) => {
          return <ChatId key={index} uniqueId={chat.id} chat={chat} />;
        })}
      </div>
    </aside>
  );
};

export default SideBar;
