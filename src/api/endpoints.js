export const API_ENDPOINTS = {
  // Months
  MONTHS: '/api/v1/months',
  MONTH_DAYS: (monthId) => `/api/v1/months/${monthId}/days`,
  
  // Days
  DAY: (dayId) => `/api/v1/days/${dayId}`,
  DAY_SOLUTIONS: (dayId) => `/api/v1/days/${dayId}/solutions`,
  DAY_BY_DATE: (date) => `/api/v1/days/by-date/${date}`,
  
  // Solutions
  SOLUTIONS: '/api/v1/solutions',
  SOLUTION: (solutionId) => `/api/v1/solutions/${solutionId}`,
  SOLUTION_BY_DAY_AND_PROBLEM: (dayId, problemNumber) => 
    `/api/v1/solutions/by-day/${dayId}/problem/${problemNumber}`,
  SOLUTION_AI: (solutionId) => `/api/v1/solutions/${solutionId}/ai-summary`, // ✅ ADD THIS
  
  // Execution
  EXECUTE: '/api/v1/execute',
  
  // Auth
  VERIFY_ADMIN: '/api/v1/auth/verify',
  
  // Stats
  STATS: '/api/v1/solutions/stats', // ✅ ADD THIS FOR DASHBOARD
};