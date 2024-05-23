function calculateDistance(cityA, cityB) {
  return Math.sqrt((cityB.x - cityA.x) ** 2 + (cityB.y - cityA.y) ** 2);
}

function totalDistance(cities) {
  let total = 0;
  for (let i = 0; i < cities.length - 1; i++) {
    total += calculateDistance(cities[i], cities[i + 1]);
  }
  total += calculateDistance(cities[cities.length - 1], cities[0]);
  return total;
}

class Particle {
  constructor(cities) {
    this.cities = cities;
    this.position = this.shuffleArray([...Array(cities.length).keys()]);
    this.velocity = new Array(cities.length)
      .fill(0)
      .map(() => Math.floor(Math.random() * cities.length));
    this.bestPosition = [...this.position];
    this.bestFitness = this.calculateFitness(this.position);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  calculateFitness(path) {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += calculateDistance(
        this.cities[path[i]],
        this.cities[path[i + 1]]
      );
    }
    distance += calculateDistance(
      this.cities[path[0]],
      this.cities[path[path.length - 1]]
    );
    return distance;
  }

  updateVelocity(
    globalBestPosition,
    inertiaWeight = 0.5,
    cognitiveWeight = 1.5,
    socialWeight = 1.5
  ) {
    this.velocity = this.velocity.map((v, index) => {
      const r1 = Math.random(),
        r2 = Math.random();
      const cognitiveComponent =
        cognitiveWeight *
        r1 *
        (this.bestPosition[index] - this.position[index]);
      const socialComponent =
        socialWeight * r2 * (globalBestPosition[index] - this.position[index]);
      return inertiaWeight * v + cognitiveComponent + socialComponent;
    });
  }

  updatePosition() {
    const newPosition = [...this.position];
    for (let i = 0; i < this.position.length; i++) {
      let newPos =
        (newPosition[i] + Math.round(this.velocity[i])) % this.cities.length;
      newPos = newPos < 0 ? newPos + this.cities.length : newPos;
      newPosition[i] = newPos;
    }

    const uniquePositions = new Set(newPosition);
    if (uniquePositions.size === this.cities.length) {
      this.position = newPosition;
    } else {
      this.position = this.shuffleArray([...Array(this.cities.length).keys()]);
    }

    let newFitness = this.calculateFitness(this.position);
    if (newFitness < this.bestFitness) {
      this.bestPosition = [...this.position];
      this.bestFitness = newFitness;
    }
  }
}

class Swarm {
  constructor(cities, numParticles) {
    this.cities = cities;
    this.numParticles = numParticles;
    this.particles = Array.from(
      { length: numParticles },
      () => new Particle(cities)
    );
    this.globalBestPosition = [...this.particles[0].position];
    this.globalBestFitness = this.particles[0].bestFitness;
    this.history = [];
    this.updateGlobalBest();
  }

  updateGlobalBest() {
    this.particles.forEach((particle) => {
      if (particle.bestFitness < this.globalBestFitness) {
        this.globalBestPosition = [...particle.bestPosition];
        this.globalBestFitness = particle.bestFitness;
      }
    });
  }

  updateParticles(inertiaWeight, cognitiveWeight, socialWeight) {
    this.particles.forEach((particle) => {
      particle.updateVelocity(
        this.globalBestPosition,
        inertiaWeight,
        cognitiveWeight,
        socialWeight
      );
      particle.updatePosition();
    });
    this.updateGlobalBest();
    this.history.push(this.globalBestFitness);
  }
}

function runPSO(
  cities,
  numParticles,
  iterations,
  inertiaWeight,
  cognitiveWeight,
  socialWeight
) {
  const swarm = new Swarm(cities, numParticles);
  for (let i = 0; i < iterations; i++) {
    swarm.updateParticles(inertiaWeight, cognitiveWeight, socialWeight);
    console.log(
      `Iteration ${i + 1}: Best fitness = ${swarm.globalBestFitness}`
    );
  }

  // Відображення індексів у фактичні міста та підрахунок загальної відстані
  const bestRoute = swarm.globalBestPosition.map((index) => cities[index]);
  const distance = totalDistance(bestRoute);

  console.log('Best path:', bestRoute);
  console.log('Best path distance:', distance);

  return {
    bestRoute,
    distance,
    iterations,
    distanceHistory: swarm.history,
  };
}

export default runPSO;
