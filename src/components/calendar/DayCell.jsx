import React, { useState, useEffect } from 'react';
import { isToday } from '@utils/dateUtils';
import { DayDropdown } from './DayDropdown';
import { useSolution } from '@hooks/useSolution';
import { useStore } from '@store/store';
import apiClient from '@api/client';
import { API_ENDPOINTS } from '@api/endpoints';

export const DayCell = ({ day, onDayClick, selectedDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [actualDayId, setActualDayId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch actual database day ID
  useEffect(() => {
    const fetchDayId = async () => {
      if (!day) {
        setLoading(false);
        return;
      }
      
      try {
        const dateStr = day.toISOString().split('T')[0];
        const response = await apiClient.get(API_ENDPOINTS.DAY_BY_DATE(dateStr));
        setActualDayId(response.data.id);
        console.log('✅ Day ID fetched:', response.data.id, 'for date:', dateStr);
      } catch (error) {
        console.error('❌ Day not found for date:', day.toISOString().split('T')[0]);
        setActualDayId(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDayId();
  }, [day]);

  // Fetch solutions using actual day ID
  const { solutions, solutionsLoading, refetchSolutions } = useSolution(
    null,
    actualDayId,
    null
  );
  
  const storeSolutions = useStore((state) => state.solutions);
  const daySolutions = actualDayId ? storeSolutions[actualDayId] || [] : [];

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

  const hasSolutions = daySolutions && daySolutions.length > 0;

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
        {loading && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
        )}
        {hasSolutions && !loading && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        )}
      </button>

      {isOpen && (
        <DayDropdown 
          date={day}
          dayId={actualDayId}
          solutions={daySolutions}
          onClose={() => setIsOpen(false)}
          onRefresh={refetchSolutions}
        />
      )}
    </div>
  );
};