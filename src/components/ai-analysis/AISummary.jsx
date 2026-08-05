import React from 'react';
import { ComplexityTable } from './ComplexityTable';
import { DiffViewer } from './DiffViewer';

export const AISummary = ({ summary, timeComplexity, spaceComplexity, notes }) => {
  // Parse the summary if it's a string (from API)
  // or use it directly if it's already an object
  const summaryData = typeof summary === 'string' ? { text: summary } : summary;

  return (
    <div className="space-y-4">
      {/* User Input Summary */}
      <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          📝 Based on your input:
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Time Complexity:</span>
            <span className="ml-2 font-mono text-gray-900 dark:text-white">
              {timeComplexity || 'Not specified'}
            </span>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Space Complexity:</span>
            <span className="ml-2 font-mono text-gray-900 dark:text-white">
              {spaceComplexity || 'Not specified'}
            </span>
          </div>
        </div>
        {notes && (
          <div className="mt-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Intuition:</span>
            <span className="ml-2 text-gray-700 dark:text-gray-300">{notes}</span>
          </div>
        )}
      </div>

      {/* AI Analysis Text */}
      <div className="prose dark:prose-invert max-w-none">
        {typeof summary === 'string' ? (
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
            {summary}
          </div>
        ) : (
          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
            {summaryData.text || 'No summary available'}
          </div>
        )}
      </div>

      {/* Complexity Table */}
      <ComplexityTable
        timeComplexity={timeComplexity}
        spaceComplexity={spaceComplexity}
      />

      {/* Diff Viewer */}
      <DiffViewer summary={summary} />
    </div>
  );
};