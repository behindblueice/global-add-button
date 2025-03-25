
import React, { useState } from 'react';
import Modal from './Modal';
import ChildAvatar from './ChildAvatar';
import { ChevronDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Room {
  id: string;
  name: string;
  expanded?: boolean;
}

interface Child {
  id: string;
  name: string;
  image: string;
  roomId: string;
}

interface ChildrenModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentlySelected: Child[];
  rooms: Room[];
  children: Child[];
  selectedChildren: string[];
  onChildSelect: (childId: string) => void;
  onSubmit: () => void;
}

const ChildrenModal: React.FC<ChildrenModalProps> = ({
  isOpen,
  onClose,
  recentlySelected,
  rooms,
  children,
  selectedChildren,
  onChildSelect,
  onSubmit
}) => {
  const [expandedRooms, setExpandedRooms] = useState<string[]>([rooms[0]?.id || '']);

  const toggleRoom = (roomId: string) => {
    setExpandedRooms(prev => 
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const childrenByRoom = (roomId: string) => {
    return children.filter(child => child.roomId === roomId);
  };

  return (
    <Modal
      title="Select children"
      isOpen={isOpen}
      onClose={onClose}
      fullScreen
    >
      <div className="max-h-[calc(100vh-8rem)] overflow-y-auto pb-24">
        {/* Recently Selected Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-500">Recently selected</h3>
            <button className="text-sm text-purple">
              Select all
            </button>
          </div>
          <div className="grid grid-cols-5 gap-x-2 gap-y-4">
            {recentlySelected.map((child) => (
              <ChildAvatar
                key={child.id}
                name={child.name}
                image={child.image}
                selected={selectedChildren.includes(child.id)}
                onClick={() => onChildSelect(child.id)}
              />
            ))}
          </div>
        </div>

        {/* Rooms Section */}
        <div className="mb-6">
          {rooms.map((room) => (
            <div key={room.id} className="mb-4">
              <button
                className="flex items-center justify-between w-full p-2 mb-2"
                onClick={() => toggleRoom(room.id)}
              >
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-purple-lighter flex items-center justify-center">
                    <Users size={14} className="text-purple" />
                  </div>
                  <h3 className="ml-2 font-medium">{room.name}</h3>
                </div>
                <ChevronDown 
                  size={18} 
                  className={cn(
                    "text-gray-400 transition-transform duration-300",
                    expandedRooms.includes(room.id) && "transform rotate-180"
                  )}
                />
              </button>
              
              {expandedRooms.includes(room.id) && (
                <div className="animate-fade-in grid grid-cols-5 gap-x-2 gap-y-4 pl-2">
                  {childrenByRoom(room.id).map((child) => (
                    <ChildAvatar
                      key={child.id}
                      name={child.name}
                      image={child.image}
                      selected={selectedChildren.includes(child.id)}
                      onClick={() => onChildSelect(child.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t flex space-x-4">
        <button 
          className="flex-1 py-3 px-4 rounded-xl border border-gray-300 text-gray-700"
          onClick={onClose}
        >
          Cancel
        </button>
        <button 
          className="flex-1 py-3 px-4 rounded-xl bg-purple text-white font-medium"
          onClick={onSubmit}
        >
          Log step
        </button>
      </div>
    </Modal>
  );
};

export default ChildrenModal;
