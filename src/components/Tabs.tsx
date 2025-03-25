
import React from 'react';
import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="tabs-container">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            "tab",
            activeTab === tab && "active"
          )}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
