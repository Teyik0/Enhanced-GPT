'use client';
import { useStore } from '@/utils';

const TextArea = () => {
  const { newQuestion, setNewQuestion } = useStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newQuestion === '') return; //Si le champ est vide, on ne fait rien
    // addMsgToConv('Me', newQuestion); //On ajoute la question de l'user à la conversation
    setNewQuestion(''); //On vide le champ

    const resp = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: newQuestion }),
    });
    try {
      if (!resp.ok) throw new Error('Something went wrong');
      const data = await resp.json();
      console.log(data.answer.choices[0]);
      // addMsgToConv('Bot', data.answer.choices[0].text);
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className='w-full p-2 flex justify-center'>
      <form
        className='flex items-center border p-2 pl-4 border-gray-900/50 text-white
      bg-gray-700 rounded-md w-full md:w-[48rem]'
        onSubmit={handleSubmit}
      >
        <textarea
          placeholder='Type a message...'
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
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
