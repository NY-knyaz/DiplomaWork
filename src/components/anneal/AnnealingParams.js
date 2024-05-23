import React from 'react';

const AnnealingParams = ({
  initialTemperature,
  setInitialTemperature,
  coolingRate,
  setCoolingRate,
  minTemperature,
  setMinTemperature,
  iterationsPerTemperature,
  setIterationsPerTemperature,
}) => {
  return (
    <div className='anneal-params'>
      <label>
        Початкова температура
        <input
          type='number'
          value={initialTemperature}
          onChange={(e) => setInitialTemperature(Number(e.target.value))}
          placeholder='Введіть початкову температуру'
        />
      </label>
      <label>
        Коефіцієнт охолодження
        <input
          type='number'
          value={coolingRate}
          onChange={(e) => setCoolingRate(Number(e.target.value))}
          placeholder='Введіть коефіцієнт охолодження'
          step='0.01'
        />
      </label>
      <label>
        Мінімальна температура
        <input
          type='number'
          value={minTemperature}
          onChange={(e) => setMinTemperature(Number(e.target.value))}
          placeholder='Введіть мінімальну температуру'
          step='0.01'
        />
      </label>
      <label>
        Ітерації на температуру
        <input
          type='number'
          value={iterationsPerTemperature}
          onChange={(e) => setIterationsPerTemperature(Number(e.target.value))}
          placeholder='Введіть кількість ітерацій на температуру'
        />
      </label>
    </div>
  );
};

export default AnnealingParams;
