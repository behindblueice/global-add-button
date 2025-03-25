
import React from 'react';

interface GreetingProps {
  name: string;
}

const Greeting: React.FC<GreetingProps> = ({ name }) => {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-medium flex items-center">
        Good morning, {name} <span className="ml-1">👋</span>
      </h2>
    </div>
  );
};

export default Greeting;
