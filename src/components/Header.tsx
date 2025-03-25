
import React from 'react';
import { Search, BellRing, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="bg-purple flex items-center justify-between px-4 py-3 text-white">
      <h1 className="text-xl font-semibold">{title}</h1>
      <div className="flex items-center space-x-4">
        <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200">
          <Search size={20} />
        </button>
        <button className="p-1.5 rounded-full hover:bg-white/10 transition-colors duration-200">
          <BellRing size={20} />
        </button>
        <button className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200">
          <User size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
