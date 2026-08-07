export const createSolutionSlice = (set, get) => ({
  // State
  solutions: {}, // key: day_id (integer), value: array of solutions
  currentSolution: null,
  isSaving: false,
  isEditing: false,

  // Actions
  setSolutions: (dayId, solutions) => set((state) => ({
    solutions: { ...state.solutions, [dayId]: solutions }
  })),
  
  // ✅ ADD THIS - Bulk add solutions
  addSolutions: (dayId, solutions) => set((state) => ({
    solutions: {
      ...state.solutions,
      [dayId]: solutions // Replace with fresh data from API
    }
  })),
  
  setCurrentSolution: (solution) => set({ currentSolution: solution }),
  
  addSolution: (dayId, solution) => set((state) => ({
    solutions: {
      ...state.solutions,
      [dayId]: [...(state.solutions[dayId] || []), solution]
    }
  })),
  
  updateSolution: (dayId, updatedSolution) => set((state) => ({
    solutions: {
      ...state.solutions,
      [dayId]: state.solutions[dayId]?.map((s) =>
        s.id === updatedSolution.id ? updatedSolution : s
      ) || []
    },
    currentSolution: state.currentSolution?.id === updatedSolution.id
      ? updatedSolution
      : state.currentSolution
  })),
  
  removeSolution: (dayId, solutionId) => set((state) => ({
    solutions: {
      ...state.solutions,
      [dayId]: state.solutions[dayId]?.filter((s) => s.id !== solutionId) || []
    }
  })),
  
  // ✅ ADD THIS - Clear solutions for a day
  clearSolutions: (dayId) => set((state) => ({
    solutions: {
      ...state.solutions,
      [dayId]: []
    }
  })),
  
  setIsSaving: (isSaving) => set({ isSaving }),
  
  setIsEditing: (isEditing) => set({ isEditing }),
  
  clearCurrentSolution: () => set({ currentSolution: null }),
  
  // ✅ ADD THIS - Get solutions for a specific day
  getSolutionsByDay: (dayId) => {
    const state = get();
    return state.solutions[dayId] || [];
  },
});