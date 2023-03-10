import { DocumentData } from 'firebase/firestore';

interface ChatPostProps {
  message: DocumentData;
  id: string;
}

const ChatPost = ({ message, id }: ChatPostProps) => {
  const { createdAt, text, user } = message;
  return (
    <div
      className={`flex flex-col justify-center md:items-center px-2 ${
        user.name === 'ChatBot' ? 'bg-[#454754]' : 'bg-[#343441]'
      }`}
    >
      <div className='flex w-full lg:w-[46rem] py-4'>
        <div
          className='h-12 w-12 rounded-lg bg-gray-800 flex items-center justify-center text-white
            font-semibold mr-4'
        >
          {user.name === 'ChatBot' ? 'Bot' : user.name.slice(0, 4)}
        </div>
        <div className='text-white w-5/6' id={id}>
          {text &&
            text.split('\n').map((line: string, index: number) => {
              if (line === '')
                return (
                  <div key={id + index + createdAt.toDate().toLocaleString()}>
                    <br />
                  </div>
                );
              else return <p key={line}>{line}</p>;
            })}
        </div>
      </div>
      <div className='text-white lg:w-[46rem] w-full flex justify-end italic text-xs pb-2'>
        {createdAt && createdAt.toDate().toLocaleString()}
      </div>
    </div>
  );
};

export default ChatPost;
