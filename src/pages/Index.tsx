import React, { useState } from 'react';
import Header from '@/components/Header';
import Greeting from '@/components/Greeting';
import Tabs from '@/components/Tabs';
import RoomCard from '@/components/RoomCard';
import FloatingActionButton from '@/components/FloatingActionButton';
import ActionModal from '@/components/ActionModal';
import ChildrenModal from '@/components/ChildrenModal';
import { Moon, BabyIcon, Utensils, CheckCircle, Pencil, Clipboard } from 'lucide-react';

// Mock data
const rooms = [
  { 
    id: 'r1', 
    name: 'Babies', 
    count: 8, 
    color: 'yellow', 
    icon: <BabyIcon size={20} className="text-yellow" /> 
  },
  { 
    id: 'r2', 
    name: 'Toddlers', 
    count: 12, 
    color: 'blue', 
    icon: <BabyIcon size={20} className="text-blue" /> 
  },
  { 
    id: 'r3', 
    name: 'Pre-K', 
    count: 10, 
    color: 'green', 
    icon: <Pencil size={20} className="text-green" /> 
  },
  { 
    id: 'r4', 
    name: 'Infants', 
    count: 6, 
    color: 'purple', 
    icon: <BabyIcon size={20} className="text-purple" /> 
  }
];

const actions = [
  {
    id: 'a1',
    name: 'Send message',
    icon: <CheckCircle size={20} className="text-gray-600" />
  },
  {
    id: 'a2',
    name: 'Log diaper or toilet visit',
    icon: <BabyIcon size={20} className="text-gray-600" />
  },
  {
    id: 'a3',
    name: 'Log nap',
    icon: <Moon size={20} className="text-gray-600" />
  },
  {
    id: 'a4',
    name: 'Log meal',
    icon: <Utensils size={20} className="text-gray-600" />
  },
  {
    id: 'a5',
    name: 'Check-in or out',
    icon: <CheckCircle size={20} className="text-gray-600" />
  }
];

// Child images for preschool age children
const childImages = [
  "https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1576695444267-af2c3f38821b?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1629901925121-8a141c2a42c1?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1622782262245-bfb660f7446e?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1587616211362-cc49d47a8c53?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1595601827380-a3f606ea4fba?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1611979825964-530251576b28?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1537673156864-5d2c72de7824?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1554454946-b2d1e701c8c7?w=150&h=150&fit=crop&crop=faces&auto=format&q=80",
  "https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?w=150&h=150&fit=crop&crop=faces&auto=format&q=80"
];

const createChildren = (count: number, roomId: string) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `child-${roomId}-${i}`,
    name: ['Adam', 'Elise', 'Levi', 'Leo', 'Lottie', 'Nathaniel', 'Olivia', 'Zandra', 'Maya', 'Noah', 'Lily', 'Ethan'][i % 12],
    image: childImages[i % childImages.length],
    roomId
  }));
};

const allChildren = [
  ...createChildren(8, 'r1'),
  ...createChildren(12, 'r2'),
  ...createChildren(10, 'r3'),
  ...createChildren(6, 'r4')
];

const recentlySelected = [
  allChildren[0],
  allChildren[1], 
  allChildren[2],
  allChildren[10],
  allChildren[15],
  allChildren[20],
  allChildren[25]
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('Rooms');
  const [expandedRooms, setExpandedRooms] = useState<string[]>([]);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isChildrenModalOpen, setIsChildrenModalOpen] = useState(false);
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);
  const [currentAction, setCurrentAction] = useState<any>(null);

  const handleRoomToggle = (roomId: string) => {
    setExpandedRooms(prev => 
      prev.includes(roomId)
        ? prev.filter(id => id !== roomId)
        : [...prev, roomId]
    );
  };

  const handleActionSelect = (action: any) => {
    setCurrentAction(action);
    setIsActionModalOpen(false);
    setIsChildrenModalOpen(true);
  };

  const handleChildSelect = (childId: string) => {
    setSelectedChildren(prev => 
      prev.includes(childId)
        ? prev.filter(id => id !== childId)
        : [...prev, childId]
    );
  };

  const handleSubmit = () => {
    console.log('Action:', currentAction);
    console.log('Selected children:', selectedChildren);
    
    // Reset and close modals
    setIsChildrenModalOpen(false);
    setSelectedChildren([]);
    setCurrentAction(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="Overview" />
      <Greeting name="Laura" />

      <div className="px-4">
        <Tabs 
          tabs={['Rooms', 'Attendance', 'Tasks']} 
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === 'Rooms' && (
          <div className="space-y-3 py-2">
            {rooms.map((room) => (
              <RoomCard
                key={room.id}
                name={room.name}
                count={room.count}
                color={room.color}
                icon={room.icon}
                expanded={expandedRooms.includes(room.id)}
                onToggle={() => handleRoomToggle(room.id)}
              />
            ))}
          </div>
        )}

        {activeTab === 'Attendance' && (
          <div className="py-6 text-center text-gray-500">
            Attendance tab content
          </div>
        )}

        {activeTab === 'Tasks' && (
          <div className="py-6 text-center text-gray-500">
            Tasks tab content
          </div>
        )}
      </div>

      {/* Needs Your Attention Section */}
      <div className="mt-8 px-4">
        <h2 className="text-lg font-semibold mb-4">Needs your attention 💕</h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow-sm flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-lighter flex items-center justify-center text-purple-light">
                {i + 1}
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">
                  {i === 0 ? "Collect forms from parents" : 
                   i === 1 ? "Update emergency contacts" :
                   "New enrollment pending"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={() => setIsActionModalOpen(true)} />

      {/* Action Modal */}
      <ActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        actions={actions}
        onActionSelect={handleActionSelect}
      />

      {/* Children Selection Modal */}
      <ChildrenModal
        isOpen={isChildrenModalOpen}
        onClose={() => setIsChildrenModalOpen(false)}
        recentlySelected={recentlySelected}
        rooms={rooms}
        children={allChildren}
        selectedChildren={selectedChildren}
        onChildSelect={handleChildSelect}
        onSubmit={handleSubmit}
        currentAction={currentAction}
      />
    </div>
  );
};

export default Index;
