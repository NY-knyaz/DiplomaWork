import React from 'react';

const AntParams = ({
  pheromone,
  setPheromone,
  heuristic,
  setHeuristic,
  evaporation,
  setEvaporation,
}) => {
  return (
    <div className='ant-params'>
      <label>
        &alpha; Вплив феромону
        <input
          type='number'
          title='Відносний вплив феромону'
          value={pheromone}
          onChange={(e) => setPheromone(Number(e.target.value))}
          placeholder='Відносний вплив феромону'
          required
        />
      </label>
      <label>
        Евристичний вплив
        <input
          type='number'
          title='Відносний вплив евристичної інформації'
          value={heuristic}
          onChange={(e) => setHeuristic(Number(e.target.value))}
          placeholder='Евристичний вплив'
        />
      </label>
      <label>
        Швидкість випаровування
        <input
          type='number'
          value={evaporation}
          title='Швидкість випаровування феромонів'
          onChange={(e) => setEvaporation(Number(e.target.value))}
          placeholder='Швидкість випаровування'
          step='0.1'
        />
      </label>
    </div>
  );
};

export default AntParams;
