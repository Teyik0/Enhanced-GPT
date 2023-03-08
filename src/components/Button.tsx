import { useStore } from '@/utils/store';

interface ButtonProps {
  name: string;
  symbol: string;
  method?: string;
}

const Button = ({ name, symbol, method }: ButtonProps) => {
  const { clearAllConversation } = useStore();
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (method === 'clear') {
      clearAllConversation();
    }
  };
  return (
    <button
      className='flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 
        text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20 w-full h-fit'
      onClick={handleClick}
    >
      <span>{symbol}</span> {name}
    </button>
  );
};

export default Button;
