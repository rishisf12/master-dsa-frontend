import React, { useState } from 'react';
import { isToday } from '@utils/dateUtils';
import { DayDropdown } from './DayDropdown';

export const DayCell = ({ day }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!day) {
    return <div className="w-full h-8" />;
  }

  const isCurrentDay = isToday(day);
  const dayNumber = day.getDate();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`
          w-full h-8 rounded-lg transition-all duration-200
          flex items-center justify-center text-sm font-medium
          hover:shadow-md transform hover:scale-105
          ${isCurrentDay 
            ? 'bg-linear-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-md' 
            : 'bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
          }
        `}
      >
        {dayNumber}
      </button>

      {isOpen && (
        <DayDropdown 
          date={day} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </div>
  );
};