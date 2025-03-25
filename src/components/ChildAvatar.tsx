
import React from 'react';
import { cn } from '@/lib/utils';

interface ChildAvatarProps {
  name: string;
  image: string;
  selected?: boolean;
  onClick?: () => void;
}

const ChildAvatar: React.FC<ChildAvatarProps> = ({ 
  name, 
  image, 
  selected = false,
  onClick 
}) => {
  return (
    <button 
      className="flex flex-col items-center justify-center p-2 transition-all duration-300"
      onClick={onClick}
    >
      <div className={cn(
        "child-avatar mb-2",
        selected && "border-purple ring-2 ring-purple/30"
      )}>
        <img src={image} alt={name} />
        {selected && (
          <div className="absolute bottom-0 right-0 bg-purple rounded-full w-5 h-5 flex items-center justify-center">
            <svg 
              className="w-3 h-3 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </div>
        )}
      </div>
      <span className="text-xs text-center font-medium truncate w-full">
        {name}
      </span>
    </button>
  );
};

export default ChildAvatar;
