function calculateDistance(nodeA, nodeB) {
  return Math.sqrt((nodeB.x - nodeA.x) ** 2 + (nodeB.y - nodeA.y) ** 2);
}

function totalDistance(nodes) {
  let total = 0;
  for (let i = 0; i < nodes.length - 1; i++) {
    total += calculateDistance(nodes[i], nodes[i + 1]);
  }
  total += calculateDistance(nodes[nodes.length - 1], nodes[0]);
  return total;
}

// Функція для генерації початкової популяції маршрутів
function generateInitialPopulation(nodes, populationSize) {
  const population = [];
  for (let i = 0; i < populationSize; i++) {
    const shuffledNodes = [...nodes].sort(() => Math.random() - 0.5);
    population.push({
      route: shuffledNodes,
      distance: totalDistance(shuffledNodes),
    });
  }
  return population;
}

function tournamentSelection(population, tournamentSize) {
  let tournament = [];
  for (let i = 0; i < tournamentSize; i++) {
    tournament.push(population[Math.floor(Math.random() * population.length)]);
  }
  tournament.sort((a, b) => a.distance - b.distance);
  return tournament[0]; // Return the best from the tournament
}

function crossover(parent1, parent2, length, crossoverRate) {
  if (Math.random() < crossoverRate) {
    // One-point crossover
    const point = Math.floor(Math.random() * length);
    const child1 = new Set(parent1.slice(0, point));
    const child2 = new Set(parent2.slice(0, point));
    fillChild(child1, parent2);
    fillChild(child2, parent1);
    return [Array.from(child1), Array.from(child2)];
  } else {
    // No crossover, return parents as children
    return [parent1, parent2];
  }
}

function fillChild(child, parent) {
  parent.forEach((node) => {
    if (!child.has(node)) {
      child.add(node);
    }
  });
}

function mutate(route, mutationRate) {
  let newRoute = [...route];
  if (Math.random() < mutationRate) {
    const index1 = Math.floor(Math.random() * route.length);
    const index2 = Math.floor(Math.random() * route.length);
    [newRoute[index1], newRoute[index2]] = [newRoute[index2], newRoute[index1]];
  }
  return newRoute;
}

function catastrophicReset(population, keepNum) {
  const newPopulation = population.slice(0, keepNum);
  while (newPopulation.length < population.length) {
    const shuffledNodes = [...population[0].route].sort(
      () => Math.random() - 0.5
    );
    newPopulation.push({
      route: shuffledNodes,
      distance: totalDistance(shuffledNodes),
    });
  }
  return newPopulation;
}

// Генетичний алгоритм
function geneticAlgorithm(
  nodes,
  populationSize,
  tournamentSize,
  mutationRate,
  crossoverRate,
  target,
  maxGenerations
) {
  let population = generateInitialPopulation(nodes, populationSize);
  let generation = 0;
  let distanceHistory = [];

  while (generation < maxGenerations) {
    const newPopulation = [];
    population.sort((a, b) => a.distance - b.distance);
    newPopulation.push(population[0]); // Elitism: always carry over the best solution
    distanceHistory.push(population[0].distance);

    while (newPopulation.length < populationSize) {
      // Tournament selection for parent picking
      const parent1 = tournamentSelection(population, tournamentSize);
      const parent2 = tournamentSelection(population, tournamentSize);

      // Crossover
      let [child1, child2] = crossover(
        parent1.route,
        parent2.route,
        nodes.length,
        crossoverRate
      );

      // Mutate
      child1 = mutate(child1, mutationRate);
      child2 = mutate(child2, mutationRate);

      newPopulation.push({
        route: child1,
        distance: totalDistance(child1),
      });
      if (newPopulation.length < populationSize) {
        newPopulation.push({
          route: child2,
          distance: totalDistance(child2),
        });
      }
    }

    population = newPopulation;
    generation++;

    // Catastrophic reset every 50 generations
    if (generation % 50 === 0 && generation !== 0) {
      population = catastrophicReset(population, 5); // keep top 5 individuals
    }

    if (population[0].distance < target) {
      console.log(
        `Solution found at generation ${generation} with distance ${population[0].distance}`
      );
      break;
    }

    if (generation % 10 === 0) {
      console.log(
        `Generation ${generation}, best distance: ${population[0].distance}`
      );
    }
  }

  return {
    bestRoute: population[0].route,
    distance: population[0].distance,
    generation,
    distanceHistory,
  };
}

export default geneticAlgorithm;
