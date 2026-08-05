import React from 'react';
import { MonthGrid } from './MonthGrid';

export const CalendarView = () => {
  const currentYear = 2026;
  const months = [
    { index: 0, name: 'August' },
    { index: 1, name: 'September' },
    { index: 2, name: 'October' },
    { index: 3, name: 'November' },
  ];

  return (
    <div className="space-y-8 max-h-[calc(100vh-200px)] overflow-y-auto px-2 pb-8">
      <div className="text-center mb-6">
        <div className="inline-block p-4 px-8 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 shadow-lg">
          <h2 className="text-2xl font-bold text-white">📅 Your Practice Calendar</h2>
          <p className="text-blue-100 text-sm mt-1">August - November 2026</p>
        </div>
      </div>
      
      {months.map((month) => (
        <MonthGrid
          key={month.index}
          year={currentYear}
          monthIndex={month.index}
          monthName={month.name}
        />
      ))}
    </div>
  );
};