import React, { useState, useEffect } from 'react';
import { isToday } from '@utils/dateUtils';
import { DayDropdown } from './DayDropdown';
import { useSolution } from '@hooks/useSolution';
import { useStore } from '@store/store';

export const DayCell = ({ day, onDayClick, selectedDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // ✅ Generate dayId from date
  const dayId = day ? day.getDate() : null;
  const month = day ? day.getMonth() + 1 : null;
  const year = day ? day.getFullYear() : null;
  
  // ✅ Fetch solutions for this day
  const { solutions, solutionsLoading, refetchSolutions } = useSolution(
    null, // solutionId
    dayId, // dayId
    null // problemNumber
  );
  
  // ✅ Get solutions from store
  const storeSolutions = useStore((state) => state.solutions);
  const daySolutions = dayId ? storeSolutions[dayId] || [] : [];

  if (!day) {
    return <div className="w-full h-8" />;
  }

  const isCurrentDay = isToday(day);
  const dayNumber = day.getDate();

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onDayClick) {
      onDayClick(day);
    }
  };

  // ✅ Check if day has solutions
  const hasSolutions = daySolutions && daySolutions.length > 0;
  const solutionCount = daySolutions ? daySolutions.length : 0;

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={`
          w-full h-8 rounded-lg transition-all duration-200
          flex items-center justify-center text-sm font-medium
          hover:shadow-md transform hover:scale-105
          relative
          ${isCurrentDay 
            ? 'bg-linear-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600 shadow-md' 
            : hasSolutions
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
              : 'bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
          }
        `}
      >
        {dayNumber}
        
        {/* ✅ Show dot indicator if solutions exist */}
        {hasSolutions && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <DayDropdown 
          date={day}
          dayId={dayId}
          solutions={daySolutions}
          onClose={() => setIsOpen(false)}
          onRefresh={refetchSolutions}
        />
      )}
    </div>
  );
};