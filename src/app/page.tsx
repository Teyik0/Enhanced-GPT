'use client';
import Button from '@/components/Button';
import ChatPost from '@/components/ChatPost';
import TextArea from '@/components/TextArea';
import { useStore } from '../utils/store';

export default function Home() {
  const { allConversation } = useStore();

  return (
    <main className='w-screen h-screen relative overflow-hidden'>
      <div className='flex h-full flex-1 flex-col md:pl-[260px]'>
        <main className='h-screen flex flex-col justify-between'>
          <div className='flex flex-col pt-2  overflow-y-auto'>
            {allConversation.map((item, index) => (
              <ChatPost key={index} name={item.name} message={item.message} />
            ))}
          </div>
          <TextArea />
        </main>

        <aside
          className='hidden md:absolute md:flex md:flex-col 
          inset-y-0 left-0 p-2 h-screen w-[260px] bg-[#202022]'
        >
          <Button name='New chat' symbol='+' />
          <Button name='Clear chat' symbol='-' method='clear' />
        </aside>
      </div>
    </main>
  );
}
