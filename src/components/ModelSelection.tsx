'use client';

import { useStore } from '@/utils';

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

  return <div></div>;
};

export default ModelSelection;
