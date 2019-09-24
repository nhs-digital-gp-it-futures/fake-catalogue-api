export const findSolution = (solutionId, solutions) => {
  console.log(`findSolution ${JSON.stringify(solutionId)}`)
  const solution = solutions.find(sol => {
    if (sol.id === solutionId) {
      return sol
    }
  });

  console.log(`findSolution - solution - ${JSON.stringify(solution)}`)

  return solution;
}