<DayDropdown 
  date={day}
  solutions={daySolutions}
  onClose={() => setIsOpen(false)}
  onRefresh={refetchSolutions}
/>