'use client';

import { useStore } from '@/utils';
import { useEffect } from 'react';
import Select from 'react-select';

const ModelSelection = () => {
  const { models, setModels } = useStore();
  const fetchModels = async () => {
    const response = await fetch('/api/engines', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    setModels(data);
  };
  useEffect(() => {
    fetchModels();
    console.log(models);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select
      isLoading={true}
      isSearchable={true}
      options={models}
      defaultValue={'text-davinci-003'}
      classNames={{
        control: (state) =>
          `border border-white/20 bg-[#262626] h-10 rounded-lg focus:outline-none 
          hover:border-white/20
          duration-300 ease-in-out cursor-pointer text-sm text-[#ffffff]`,
      }}
    />
  );
};

export default ModelSelection;
