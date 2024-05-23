function calculateTotalDistance(route, nodes) {
  let totalDistance = 0;
  for (let i = 0; i < route.length - 1; i++) {
    totalDistance += calculateDistance(nodes[route[i]], nodes[route[i + 1]]);
  }
  totalDistance += calculateDistance(
    nodes[route[route.length - 1]],
    nodes[route[0]]
  );
  return totalDistance;
}

function calculateDistance(nodeA, nodeB) {
  return Math.sqrt((nodeB.x - nodeA.x) ** 2 + (nodeB.y - nodeA.y) ** 2);
}

function swap(route, i, j) {
  let temp = route[i];
  route[i] = route[j];
  route[j] = temp;
}

function simulatedAnnealing(
  nodes,
  initialTemperature,
  coolingRate,
  minTemperature,
  iterationsPerTemperature
) {
  let currentRoute = nodes.map((_, index) => index);
  currentRoute.sort(() => Math.random() - 0.5); // Random initial route
  let currentDistance = calculateTotalDistance(currentRoute, nodes);
  let temperature = initialTemperature;
  let distanceHistory = [currentDistance]; // Історія відстаней
  let generation = 0; // Лічильник "поколінь"

  while (temperature > minTemperature) {
    for (let i = 0; i < iterationsPerTemperature; i++) {
      let idx1 = Math.floor(Math.random() * currentRoute.length);
      let idx2 = Math.floor(Math.random() * currentRoute.length);
      swap(currentRoute, idx1, idx2);
      let newDistance = calculateTotalDistance(currentRoute, nodes);

      if (
        newDistance < currentDistance ||
        Math.exp((currentDistance - newDistance) / temperature) > Math.random()
      ) {
        currentDistance = newDistance;
      } else {
        swap(currentRoute, idx1, idx2); // Swap back if not accepted
      }
    }
    temperature *= coolingRate;
    distanceHistory.push(currentDistance); // Збереження поточної відстані до історії
    generation++; // Збільшення лічильника поколінь

    if (generation % 10 === 0) {
      console.log(
        `Покоління ${generation}, найкраща відстань: ${Math.min(
          ...distanceHistory
        )}`
      );
    }
  }

  return {
    bestRoute: currentRoute.map((index) => nodes[index]),
    distance: currentDistance,
    generation: generation,
    distanceHistory: distanceHistory,
  };
}

export default simulatedAnnealing;
