
import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-purple text-white flex items-center justify-center shadow-lg hover:bg-purple-light transition-all duration-300 transform hover:scale-105 active:scale-95"
      onClick={onClick}
    >
      <Plus size={24} strokeWidth={2.5} />
    </button>
  );
};

export default FloatingActionButton;
