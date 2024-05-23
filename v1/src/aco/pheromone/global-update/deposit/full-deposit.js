import PartialDeposit from './partial-deposit';
import AllAnts from '../../../subset/all-ants';

class FullDeposit extends PartialDeposit {
  constructor(environment) {
    super(environment, new AllAnts());
  }
}

export default FullDeposit;
