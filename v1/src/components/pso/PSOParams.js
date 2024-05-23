import React from 'react';

const PSOParams = ({
  numParticles,
  setNumParticles,
  iterations,
  setIterations,
  inertiaWeight,
  setInertiaWeight,
  cognitiveWeight,
  setCognitiveWeight,
  socialWeight,
  setSocialWeight,
}) => {
  return (
    <div className='pso-params'>
      <label>
        Кількість частинок
        <input
          type='number'
          value={numParticles}
          onChange={(e) => setNumParticles(Number(e.target.value))}
          placeholder='Кількість частинок'
        />
      </label>
      <label>
        Вага інерції
        <input
          type='number'
          value={inertiaWeight}
          onChange={(e) => setInertiaWeight(Number(e.target.value))}
          placeholder='Вага інерції'
          step='0.01'
        />
      </label>
      <label>
        Вага когнітивного компоненту
        <input
          type='number'
          value={cognitiveWeight}
          onChange={(e) => setCognitiveWeight(Number(e.target.value))}
          placeholder='Вага когнітивного компоненту'
          step='0.01'
        />
      </label>
      <label>
        Вага соціального компоненту
        <input
          type='number'
          value={socialWeight}
          onChange={(e) => setSocialWeight(Number(e.target.value))}
          placeholder='Вага соціального компоненту'
          step='0.01'
        />
      </label>
      <label>
        Максимум поколінь
        <input
          type='number'
          value={iterations}
          onChange={(e) => setIterations(Number(e.target.value))}
          placeholder='Максимум поколінь'
        />
      </label>
    </div>
  );
};

export default PSOParams;
