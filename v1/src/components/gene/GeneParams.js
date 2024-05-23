import React from 'react';

const GeneParams = ({
  populationSize,
  setPopulationSize,
  tournamentSize,
  setTournamentSize,
  mutationRate,
  setMutationRate,
  crossoverRate,
  setCrossoverRate,
  target,
  setTarget,
  maxGenerations,
  setMaxGenerations,
}) => {
  return (
    <div className='gene-params'>
      <label>
        Розмір популяції
        <input
          type='number'
          value={populationSize}
          onChange={(e) => setPopulationSize(Number(e.target.value))}
          placeholder='Розмір популяції'
        />
      </label>
      <label>
        Розмір турніру
        <input
          type='number'
          value={tournamentSize}
          onChange={(e) => setTournamentSize(Number(e.target.value))}
          placeholder='Розмір турніру'
        />
      </label>
      <label>
        Швидкість мутації
        <input
          type='number'
          value={mutationRate}
          onChange={(e) => setMutationRate(Number(e.target.value))}
          placeholder='Швидкість мутації'
          step='0.01'
        />
      </label>
      <label>
        Шв. схрещування
        <input
          type='number'
          value={crossoverRate}
          onChange={(e) => setCrossoverRate(Number(e.target.value))}
          placeholder='Швидкість схрещування'
          step='0.01'
        />
      </label>
      <label>
        Цільова відстань
        <input
          type='number'
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          placeholder='Цільова відстань'
        />
      </label>
      <label>
        Максимум поколінь
        <input
          type='number'
          value={maxGenerations}
          onChange={(e) => setMaxGenerations(Number(e.target.value))}
          placeholder='Максимум поколінь'
        />
      </label>
    </div>
  );
};

export default GeneParams;
