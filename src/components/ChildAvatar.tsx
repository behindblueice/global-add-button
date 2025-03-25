
import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ChildAvatarProps {
  name: string;
  image: string;
  selected?: boolean;
  onClick?: () => void;
  signedOut?: boolean;
}

const ChildAvatar: React.FC<ChildAvatarProps> = ({ 
  name, 
  image, 
  selected = false,
  onClick,
  signedOut = false
}) => {
  return (
    <button 
      className="flex flex-col items-center justify-center p-2 transition-all duration-300"
      onClick={onClick}
      disabled={signedOut}
    >
      <div className={cn(
        "child-avatar mb-2 relative",
        selected && "border-purple ring-2 ring-purple/30",
        signedOut && "opacity-50 grayscale"
      )}>
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {selected && (
          <div className="absolute bottom-0 right-0 bg-purple rounded-full w-6 h-6 flex items-center justify-center z-10">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>
      <span className={cn(
        "text-xs text-center font-medium truncate w-full",
        signedOut && "text-gray-400"
      )}>
        {name}
        {signedOut && " (out)"}
      </span>
    </button>
  );
};

export default ChildAvatar;
