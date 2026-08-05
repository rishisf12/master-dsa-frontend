export const createSolutionSlice = (set, get) => ({
  // State
  solutions: {}, // key: date string, value: array of solutions
  currentSolution: null,
  isSaving: false,
  isEditing: false,

  // Actions
  setSolutions: (dateKey, solutions) => set((state) => ({
    solutions: { ...state.solutions, [dateKey]: solutions }
  })),
  
  setCurrentSolution: (solution) => set({ currentSolution: solution }),
  
  addSolution: (dateKey, solution) => set((state) => ({
    solutions: {
      ...state.solutions,
      [dateKey]: [...(state.solutions[dateKey] || []), solution]
    }
  })),
  
  updateSolution: (dateKey, updatedSolution) => set((state) => ({
    solutions: {
      ...state.solutions,
      [dateKey]: state.solutions[dateKey]?.map((s) =>
        s.id === updatedSolution.id ? updatedSolution : s
      ) || []
    },
    currentSolution: state.currentSolution?.id === updatedSolution.id
      ? updatedSolution
      : state.currentSolution
  })),
  
  removeSolution: (dateKey, solutionId) => set((state) => ({
    solutions: {
      ...state.solutions,
      [dateKey]: state.solutions[dateKey]?.filter((s) => s.id !== solutionId) || []
    }
  })),
  
  setIsSaving: (isSaving) => set({ isSaving }),
  
  setIsEditing: (isEditing) => set({ isEditing }),
  
  clearCurrentSolution: () => set({ currentSolution: null }),
});