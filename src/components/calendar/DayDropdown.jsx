import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QBox } from './QBox';
import { getDateKey } from '@utils/dateUtils';
import { useStore } from '@store/store';
import { dayService } from '@api/services/dayService';
import { showToast } from '@utils/errorHandler';

export const DayDropdown = ({ date, onClose }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dateKey = getDateKey(date);
  const { setSelectedDayId } = useStore();

  const handleQClick = async (qNumber) => {
    setIsLoading(true);
    try {
      const day = await dayService.getDayByDate(dateKey);
      
      if (!day || !day.id) {
        showToast.error('Day not found in database');
        return;
      }
      
      setSelectedDayId(day.id);
      navigate(`/problem/${dateKey}/${qNumber}`);
      onClose();
      
    } catch (error) {
      showToast.error('Failed to load day. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute left-0 right-0 mt-1 z-50 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-2 min-w-30">
      <div className="space-y-0.5">
        <QBox 
          qNumber={1} 
          onClick={() => handleQClick(1)}
          disabled={isLoading}
        />
        <QBox 
          qNumber={2} 
          onClick={() => handleQClick(2)}
          disabled={isLoading}
        />
        <QBox 
          qNumber={3} 
          onClick={() => handleQClick(3)}
          disabled={isLoading}
        />
        {isLoading && (
          <div className="text-center text-xs text-gray-500 py-1">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};