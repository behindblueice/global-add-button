
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoomCardProps {
  name: string;
  count: number;
  color: string;
  icon: React.ReactNode;
  expanded?: boolean;
  onToggle: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ 
  name, 
  count, 
  color, 
  icon,
  expanded = false,
  onToggle 
}) => {
  const bgColorClass = `bg-${color}-light`;
  const textColorClass = `text-${color}`;
  
  return (
    <div className="room-card">
      <button 
        className="w-full flex items-center justify-between"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", bgColorClass)}>
            {icon}
          </div>
          <div className="ml-3">
            <h3 className="font-medium">{name}</h3>
            <p className="text-sm text-gray-500">{count} children</p>
          </div>
        </div>
        <ChevronRight 
          size={20} 
          className={cn(
            "text-gray-400 transition-transform duration-300", 
            expanded && "transform rotate-90"
          )} 
        />
      </button>

      {expanded && (
        <div className="mt-4 pl-14 animate-fade-in">
          <p className="text-sm text-gray-500 mb-3">Children in this room:</p>
          <div className="grid grid-cols-5 gap-3">
            {/* Placeholder for child avatars */}
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="child-avatar">
                <img 
                  src={`https://i.pravatar.cc/100?img=${(i+5) * 3}`} 
                  alt={`Child ${i+1}`} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;
