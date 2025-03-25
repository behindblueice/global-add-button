
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

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
        "child-avatar mb-2 relative",
        selected && "border-purple ring-2 ring-purple/30"
      )}>
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {selected && (
          <div className="absolute bottom-0 right-0 bg-purple rounded-full w-5 h-5 flex items-center justify-center z-10">
            <Check className="w-3 h-3 text-white" />
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
