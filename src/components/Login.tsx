'use client';
import Image from 'next/image';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Loader from './Loader';

const Login = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className='h-screen flex flex-col justify-center items-center text-center text-white'>
      <Image
        src='/ChatGPT-logo-326x245.webp'
        alt='logo'
        width={200}
        height={200}
        priority
        className='rounded-2xl h-auto'
      />
      {!loading ? (
        <button
          className='flex justify-center mt-8 py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 
        text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20 w-[300px] text-center h-fit'
          onClick={() => {
            setLoading(true);
            signIn('google');
          }}
        >
          Sign in To Enhanced CHAT-GPT
        </button>
      ) : (
        <Loader size='big' />
      )}
    </div>
  );
};

export default Login;
