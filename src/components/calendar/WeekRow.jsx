import React from 'react';
import { DayCell } from './DayCell';

export const WeekRow = ({ week }) => {
  return (
    <div className="grid grid-cols-7 gap-0.5">
      {week.map((day, index) => (
        <DayCell key={index} day={day} />
      ))}
    </div>
  );
};