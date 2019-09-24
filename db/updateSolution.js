export const updateSolution = (solutionId, solutions, updatedSolution) => {
  const solutionIndex = solutions.findIndex(sol => sol.id === solutionId);

  solutions[solutionIndex] = updatedSolution

  return solutions;
}