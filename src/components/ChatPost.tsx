import React from 'react';

interface ChatPostProps {
  name: string;
  message: string;
}

const ChatPost = ({ name, message }: ChatPostProps) => {
  return (
    <div
      className={`w-full p-2 flex justify-center ${
        name === 'Bot' && 'bg-gray-600/80'
      }`}
    >
      <div className='flex md:w-[48rem] py-4'>
        <div
          className='h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center text-white
            font-semibold mr-4'
        >
          {name}
        </div>
        <div className='text-white w-11/12'>{message}</div>
      </div>
    </div>
  );
};

export default ChatPost;