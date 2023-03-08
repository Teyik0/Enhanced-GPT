'use client';
import { useState } from 'react';
const Client = () => {
  const [formValue, setFormValue] = useState('');
  const [answer, setAnswer] = useState('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: formValue }),
    });
    const data = await resp.json();
    setAnswer(data.choices[0].text);
  };

  return (
    <div className='flex flex-col w-full p-8'>
      <form
        className='flex justify-end absolute bottom-8 right-8'
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder='Type here'
          rows={1}
          className='w-full resize-none border-0 bg-gray-600 p-4 focus:ring-0 focus-visible:ring-0 
          max-h-[200px] overflow-y-hidden rounded-l-2xl'
          value={formValue}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormValue(e.target.value)
          }
        />
        <button
          className='bg-green-400 rounded-r-2xl p-4 text-2xl font-bold'
          type='submit'
        >
          Send
        </button>
      </form>
      <span className='mt-4 text-white font-semibold'>{answer}</span>
    </div>
  );
};

export default Client;
