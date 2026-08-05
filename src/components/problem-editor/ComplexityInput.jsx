import React from 'react';
import { Input } from '@components/ui/Input';

export const ComplexityInput = ({ formData, setFormData, isEditing }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        📊 Complexity & Intuition
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Time Complexity"
            value={formData.timeComplexity}
            onChange={(e) => setFormData({ ...formData, timeComplexity: e.target.value })}
            placeholder="e.g., O(n)"
            disabled={!isEditing}
          />
          <Input
            label="Space Complexity"
            value={formData.spaceComplexity}
            onChange={(e) => setFormData({ ...formData, spaceComplexity: e.target.value })}
            placeholder="e.g., O(1)"
            disabled={!isEditing}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes / Intuition
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Explain your approach..."
            disabled={!isEditing}
            className="w-full px-4 py-2 border rounded-lg transition-colors duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed min-h-20"
          />
        </div>
      </div>
    </div>
  );
};