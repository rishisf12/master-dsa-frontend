import React, { useState, useEffect } from 'react';
import { useAI } from '@hooks/useAI';
import { GenerateButton } from './GenerateButton';
import { AISummary } from './AISummary';
import { LoadingState } from './LoadingState';
import { showToast } from '@utils/errorHandler';

export const AIAnalysis = ({
  solutionId,
  pythonCode,
  cppCode,
  problemName,
  timeComplexity,
  spaceComplexity,
  notes,
  isEditing,
  isAdminVerified,
  existingSummary, // ✅ New prop for existing AI summary
}) => {
  const { generateSummary, isGenerating } = useAI();
  const [summary, setSummary] = useState(null);

  // ✅ Load existing summary when available
  useEffect(() => {
    if (existingSummary) {
      console.log('Loading existing AI summary:', existingSummary);
      setSummary(existingSummary);
    }
  }, [existingSummary]);

  const handleGenerate = async () => {
    if (!isAdminVerified) {
      showToast.error('Please verify as admin to generate AI summary');
      return;
    }

    if (!solutionId) {
      showToast.error('Please save the solution first');
      return;
    }

    const result = await generateSummary(solutionId);
    if (result) {
      setSummary(result);
    }
  };

  // Display existing summary if available, otherwise show generated
  const displaySummary = summary || existingSummary;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          🤖 AI Code Analysis & Comparison
        </h3>
        <GenerateButton
          onClick={handleGenerate}
          isGenerating={isGenerating}
          isDisabled={!isAdminVerified || !solutionId || isEditing}
        />
      </div>

      {isGenerating ? (
        <LoadingState />
      ) : displaySummary ? (
        <AISummary
          summary={displaySummary}
          timeComplexity={timeComplexity}
          spaceComplexity={spaceComplexity}
          notes={notes}
        />
      ) : (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p className="text-sm">
            {!isAdminVerified
              ? '🔒 Please verify as admin to generate AI analysis'
              : !solutionId
              ? '💾 Please save the solution first'
              : 'Click "Generate AI Summary" to analyze your code'}
          </p>
        </div>
      )}
    </div>
  );
};