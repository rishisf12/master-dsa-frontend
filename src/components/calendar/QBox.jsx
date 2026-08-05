import React from 'react';

export const QBox = ({ qNumber, onClick, disabled = false }) => {
  console.log(`QBox ${qNumber} rendered, disabled: ${disabled}`);
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full px-3 py-1.5 text-sm font-medium text-left rounded-md 
        transition-colors 
        ${disabled 
          ? 'opacity-50 cursor-not-allowed text-gray-400' 
          : 'hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
        }
      `}
    >
      Q{qNumber} 📝
    </button>
  );
};