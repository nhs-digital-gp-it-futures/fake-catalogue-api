import solutions from './solutions';

export const filterSolutionsByCapabilities = (selectedCapabilities) => {
  const filteredSolutions = [];

  solutions.map(solution => {
    const listOfCapabilityIds = solution.capabilities.map(capability => capability.id);

    const hasAllSelectedCapabilities = selectedCapabilities.every(selectedCapability => listOfCapabilityIds.indexOf(selectedCapability) > -1)

    if (hasAllSelectedCapabilities) {
      filteredSolutions.push(solution)
    }
  });

  return filteredSolutions;
}