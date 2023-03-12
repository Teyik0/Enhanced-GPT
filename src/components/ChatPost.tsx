import { DocumentData } from 'firebase/firestore';

interface ChatPostProps {
  message: DocumentData;
  id: string;
}

const ChatPost = ({ message, id }: ChatPostProps) => {
  const { createdAt, text, user } = message;
  return (
    <div
      className={`w-full flex flex-col justify-center items-center px-2 ${
        user.name === 'ChatBot' && 'bg-gray-600/80'
      }`}
    >
      <div className='flex md:w-[48rem] w-full py-4'>
        <div
          className='h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center text-white
            font-semibold mr-4'
        >
          {user.name === 'ChatBot' ? 'Bot' : user.name.slice(0, 4)}
        </div>
        <div className='text-white w-5/6' id={id}>
          {text}
        </div>
      </div>
      <div className='text-white md:w-[48rem] w-full flex justify-end italic text-xs pb-2'>
        {createdAt && createdAt.toDate().toLocaleString()}
      </div>
    </div>
  );
};

export default ChatPost;
