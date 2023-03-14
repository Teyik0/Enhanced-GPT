'use client';

import { useStore } from '@/utils';

const ModelSelection = () => {
  const { setModel, model } = useStore();

  const optionStyle = `bg-[#262626] text-white`;

  return (
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
  );
};

export default ModelSelection;
