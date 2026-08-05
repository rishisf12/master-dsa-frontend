import { useState } from 'react';
import { aiService } from '@api/services/aiService';
import { showToast } from '@utils/errorHandler';

export const useAI = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSummary, setAISummary] = useState(null);
  const [error, setError] = useState(null);

  const generateSummary = async (solutionId) => {
    setIsGenerating(true);
    setError(null);
    try {
      const response = await aiService.generateSummary(solutionId);
      setAISummary(response.summary);
      return response.summary;
    } catch (err) {
      setError('Failed to generate AI summary');
      showToast.error('AI generation failed');
      console.error(err);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  const executeCode = async (language, code, stdin = '') => {
    try {
      const response = await aiService.executeCode(language, code, stdin);
      return response;
    } catch (err) {
      showToast.error('Code execution failed');
      console.error(err);
      return { stdout: '', stderr: 'Execution failed' };
    }
  };

  return {
    isGenerating,
    aiSummary,
    error,
    generateSummary,
    executeCode,
  };
};