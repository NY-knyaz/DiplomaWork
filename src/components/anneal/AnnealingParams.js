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
          title='Визначає з якою температурою алгоритм починає. Вища початкова температура дозволяє алгоритму приймати гірші рішення на початку, щоб уникнути локальних мінімумів'
        />
      </label>
      <label>
        Коефіцієнт охолодження
        <input
          type='number'
          value={coolingRate}
          onChange={(e) => setCoolingRate(Number(e.target.value))}
          placeholder='Введіть коефіцієнт охолодження'
          title='Це число між 0 і 1, яке визначає, наскільки швидко знижуватиметься температура. Нижчий коефіцієнт охолодження призведе до повільнішого охолодження, що дає алгоритму більше часу для пошуку оптимального рішення.'
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
          title='Задає нижню межу температури, при якій алгоритм зупиниться. Це запобігає занадто тривалому виконанню алгоритму.'
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
          title='Кількість спроб зміни рішення, яке виконується на кожному кроці температури. Збільшення цього числа може підвищити якість кінцевого рішення.'
        />
      </label>
    </div>
  );
};

export default AnnealingParams;
