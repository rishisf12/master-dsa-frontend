import apiClient from '../client';
import { API_ENDPOINTS } from '../endpoints';

export const aiService = {
  // Execute code (Python or C++)
  executeCode: async (language, code, stdin = '') => {
    const response = await apiClient.post(API_ENDPOINTS.EXECUTE, {
      language,
      code,
      stdin,
    });
    return response.data;
  },

  // Generate AI summary for a solution
  generateSummary: async (solutionId) => {
    const response = await apiClient.post(API_ENDPOINTS.SOLUTION_AI(solutionId));
    return response.data;
  },
};