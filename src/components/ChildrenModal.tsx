import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ChildAvatar from './ChildAvatar';
import { ChevronDown, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  signedOut?: boolean;
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
  currentAction: any;
}

const ChildrenModal: React.FC<ChildrenModalProps> = ({
  isOpen,
  onClose,
  recentlySelected,
  rooms,
  children,
  selectedChildren,
  onChildSelect,
  onSubmit,
  currentAction
}) => {
  const [expandedRooms, setExpandedRooms] = useState<string[]>([rooms[0]?.id || '']);
  const [roomSelectionState, setRoomSelectionState] = useState<Record<string, boolean>>({});
  const [recentlySelectedState, setRecentlySelectedState] = useState<boolean>(false);
  const [showSignedOut, setShowSignedOut] = useState<boolean>(false);

  useEffect(() => {
    const initialState: Record<string, boolean> = {};
    rooms.forEach(room => {
      initialState[room.id] = false;
    });
    setRoomSelectionState(initialState);
  }, [rooms]);

  const toggleRoom = (roomId: string) => {
    setExpandedRooms(prev => 
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const childrenByRoom = (roomId: string) => {
    return showSignedOut 
      ? children.filter(child => child.roomId === roomId)
      : children.filter(child => child.roomId === roomId && !child.signedOut);
  };

  const handleSelectAllForRoom = (roomId: string) => {
    const currentState = roomSelectionState[roomId];
    setRoomSelectionState({...roomSelectionState, [roomId]: !currentState});
    
    const roomChildren = childrenByRoom(roomId);
    
    if (!currentState) {
      roomChildren.forEach(child => {
        if (!selectedChildren.includes(child.id)) {
          onChildSelect(child.id);
        }
      });
    } else {
      roomChildren.forEach(child => {
        if (selectedChildren.includes(child.id)) {
          onChildSelect(child.id);
        }
      });
    }
  };

  const handleSelectAllRecentlySelected = () => {
    setRecentlySelectedState(!recentlySelectedState);
    
    if (!recentlySelectedState) {
      recentlySelected.forEach(child => {
        if (!selectedChildren.includes(child.id)) {
          onChildSelect(child.id);
        }
      });
    } else {
      recentlySelected.forEach(child => {
        if (selectedChildren.includes(child.id)) {
          onChildSelect(child.id);
        }
      });
    }
  };

  const areAllChildrenInRoomSelected = (roomId: string) => {
    const roomChildren = childrenByRoom(roomId);
    return roomChildren.length > 0 && roomChildren.every(child => selectedChildren.includes(child.id));
  };

  const areAllRecentlySelectedChildrenSelected = () => {
    return recentlySelected.length > 0 && recentlySelected.every(child => selectedChildren.includes(child.id));
  };

  useEffect(() => {
    const newRoomSelectionState = {...roomSelectionState};
    
    rooms.forEach(room => {
      newRoomSelectionState[room.id] = areAllChildrenInRoomSelected(room.id);
    });
    
    setRoomSelectionState(newRoomSelectionState);
    setRecentlySelectedState(areAllRecentlySelectedChildrenSelected());
  }, [selectedChildren, showSignedOut]);

  const toggleShowSignedOut = () => {
    setShowSignedOut(prev => !prev);
  };

  const footerContent = (
    <div className="flex space-x-4">
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
        {currentAction ? `${currentAction.name} (${selectedChildren.length})` : 'Log step'}
      </button>
    </div>
  );

  return (
    <Modal
      title="Select children"
      isOpen={isOpen}
      onClose={onClose}
      initialHeight="65vh"
      expandOnScroll
      showFooter={true}
      footerContent={footerContent}
    >
      <div className="relative pb-16">
        <div className="mb-4 flex">
          <button
            onClick={toggleShowSignedOut}
            className={cn(
              "toggle-pill",
              showSignedOut ? "inactive" : "active"
            )}
          >
            {showSignedOut ? "Don't show signed out" : "Show signed out"}
          </button>
        </div>

        <div className="space-y-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-500">Recently selected</h3>
              <button 
                className="text-sm text-purple"
                onClick={handleSelectAllRecentlySelected}
              >
                {recentlySelectedState ? 'Deselect all' : 'Select all'}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-x-2 gap-y-6">
              {recentlySelected.map((child) => (
                <ChildAvatar
                  key={child.id}
                  name={child.name}
                  image={child.image}
                  selected={selectedChildren.includes(child.id)}
                  onClick={() => onChildSelect(child.id)}
                  signedOut={child.signedOut}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            {rooms.map((room) => (
              <div key={room.id} className="mb-4">
                <div className="flex items-center justify-between w-full p-2 mb-2">
                  <button
                    className="flex items-center"
                    onClick={() => toggleRoom(room.id)}
                  >
                    <div className="w-6 h-6 rounded-full bg-purple-lighter flex items-center justify-center">
                      <Users size={14} className="text-purple" />
                    </div>
                    <h3 className="ml-2 font-medium">{room.name}</h3>
                    <ChevronDown 
                      size={18} 
                      className={cn(
                        "ml-2 text-gray-400 transition-transform duration-300",
                        expandedRooms.includes(room.id) && "transform rotate-180"
                      )}
                    />
                  </button>
                  
                  {expandedRooms.includes(room.id) && (
                    <button 
                      className="text-sm text-purple"
                      onClick={() => handleSelectAllForRoom(room.id)}
                    >
                      {roomSelectionState[room.id] ? 'Deselect all' : 'Select all'}
                    </button>
                  )}
                </div>
                
                {expandedRooms.includes(room.id) && (
                  <div className="animate-fade-in grid grid-cols-3 gap-x-2 gap-y-6 pl-2">
                    {childrenByRoom(room.id).map((child) => (
                      <ChildAvatar
                        key={child.id}
                        name={child.name}
                        image={child.image}
                        selected={selectedChildren.includes(child.id)}
                        onClick={() => onChildSelect(child.id)}
                        signedOut={child.signedOut}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ChildrenModal;
