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
          title='Визначає кількість маршрутів у популяції. Більший розмір популяції забезпечує більшу різноманітність, але збільшує вимоги до обчислювальних ресурсів.'
        />
      </label>
      <label>
        Розмір турніру
        <input
          type='number'
          value={tournamentSize}
          onChange={(e) => setTournamentSize(Number(e.target.value))}
          placeholder='Розмір турніру'
          title='Кількість маршрутів, що вибираються для турніру при виборі батьків. Більший розмір турніру підвищує шанси вибору кращих маршрутів.'
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
          title='Ймовірність мутації у кожному новому маршруті. Мутації додають випадковість в популяцію, що може допомогти вийти з локальних оптимумів.'
        />
      </label>
      <label>
        Швидкість схрещування
        <input
          type='number'
          value={crossoverRate}
          onChange={(e) => setCrossoverRate(Number(e.target.value))}
          placeholder='Швидкість схрещування'
          step='0.01'
          title='Ймовірність кросоверу між двома батьками для створення нових маршрутів. Кросовер сприяє обміну генетичною інформацією між рішеннями.'
        />
      </label>
      {/* <label>
        Цільова відстань
        <input
          type='number'
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          placeholder='Цільова відстань'
          title='Цільова відстань, яку алгоритм намагається досягти або покращити. Якщо будь-який маршрут досягне цієї відстані, алгоритм зупиниться.'
        />
      </label> */}
      <label>
        Максимум поколінь
        <input
          type='number'
          value={maxGenerations}
          onChange={(e) => setMaxGenerations(Number(e.target.value))}
          placeholder='Максимум поколінь'
          title='Максимальна кількість поколінь, що генеруватимуться алгоритмом. Якщо алгоритм досягне цього ліміту, він зупиниться.'
        />
      </label>
    </div>
  );
};

export default GeneParams;
