import ACO from './aco';
import PseudoRandomProportional from './exploration/pseudo-random-proportional';
import RouletteWheel from './selection/roulette-wheel';
import FullEvaporation from './pheromone/global-update/evaporation/full-evaporation';
import FullDeposit from './pheromone/global-update/deposit/full-deposit';

class AntSystem extends ACO {
  constructor(environment) {
    super(
      environment,
      new PseudoRandomProportional(environment, new RouletteWheel())
    );

    this.evaporations.push(new FullEvaporation(environment));
    this.deposits.push(new FullDeposit(environment));
  }

  getT0() {
    let k = this.environment.getNumberOfAnts();
    let cnn = this.environment.cnn;

    return k / cnn;
  }
}

export default AntSystem;
