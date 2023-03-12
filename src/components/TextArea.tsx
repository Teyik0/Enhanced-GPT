'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, useStore } from '@/utils';
import { toast } from 'react-hot-toast';

interface Message {
  text: string;
  createdAt: any;
  user: {
    _id: string;
    name: string;
  };
}

const TextArea = () => {
  const [prompt, setPrompt] = useState('');
  const { data: session } = useSession();
  const { activeChatId, chatNumber } = useStore();
  const [loading, setLoading] = useState(false);

  const model = 'text-davinci-003';
  const temperature = 0.9;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;
    if (loading) return;
    if (chatNumber === 0) {
      toast.error('You need to create a chat before chating !', { id: '' });
      return;
    }
    setLoading(true);

    const input = prompt.trim();
    setPrompt('');

    const message: Message = {
      text: input,
      createdAt: new Date(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
      },
    };

    await addDoc(
      collection(
        db,
        'users',
        session?.user?.email!,
        'chats',
        activeChatId,
        'messages'
      ),
      message
    );

    //Toast notification
    const notification = toast.loading('Wait for the AI to respond...');
    //Sending the post request to the API
    const resp = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: input,
        chatId: activeChatId,
        model,
        temperature,
        session,
      }),
    });
    try {
      if (!resp.ok) throw new Error('Something went wrong');
      toast.success('AI responded!', { id: notification });
      const data = await resp.json();
      console.log(data.answer.split('\n'));
    } catch (error: any) {
      console.log(error);
      toast.error('Something went wrong', { id: notification });
    }
    setLoading(false);
  };

  return (
    <div className='w-full p-2 flex justify-center'>
      <Toaster position='top-right' />
      <form
        className='flex items-center border p-2 pl-4 border-gray-900/50 text-white
      bg-gray-700 rounded-md w-full md:w-[47rem]'
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder='Type a message...'
          value={loading ? 'Wait before asking something else...' : prompt}
          onChange={(e) => {
            if (!loading) setPrompt(e.target.value);
          }}
          rows={1}
          className='m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 
        focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0'
        />
        <button
          className='rounded-md p-2 text-gray-500 hover:bg-gray-100 dark:hover:text-gray-400 
        dark:hover:bg-gray-900 disabled:hover:bg-transparent'
          type='submit'
        >
          <svg
            stroke='currentColor'
            fill='none'
            strokeWidth='2'
            viewBox='0 0 24 24'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='h-4 w-4 mr-1'
            height='1em'
            width='1em'
            xmlns='http://www.w3.org/2000/svg'
          >
            <line x1='22' y1='2' x2='11' y2='13'></line>
            <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default TextArea;
