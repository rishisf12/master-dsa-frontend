// src/pages/ProblemPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { ProblemEditor } from '@components/problem-editor/ProblemEditor';
import { useStore } from '@store/store';
import { useSolution } from '@hooks/useSolution';
import { Loader } from '@components/common/Loader';

export const ProblemPage = () => {
  const { date, qNumber } = useParams();
  const { selectedDayId } = useStore();

  // Parse date from URL
  const [year, month, day] = date.split('-').map(Number);
  const dateObj = new Date(year, month - 1, day);
  const problemNumber = parseInt(qNumber);

  // ✅ Only fetch if selectedDayId exists
  const { solution, isLoading, error } = useSolution(
    null, 
    selectedDayId,  // If null, the query won't run
    problemNumber
  );

  console.log('ProblemPage - selectedDayId:', selectedDayId);
  console.log('ProblemPage - solution:', solution);
  console.log('ProblemPage - error:', error);

  // ✅ Show loading if selectedDayId is null or fetching
  if (isLoading || selectedDayId === null || selectedDayId === undefined) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Loader message="Loading your solution..." />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProblemEditor
        date={dateObj}
        problemNumber={problemNumber}
        dayId={selectedDayId}
        existingSolution={solution}
      />
    </div>
  );
};