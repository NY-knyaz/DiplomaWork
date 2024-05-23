import React from 'react';
import Chart from '../Chart.js';

const ControlsPanel = ({ distances, generations }) => {
  return (
    <div>
      <div className='chartContainer'>
        <Chart
          distances={distances}
          generations={generations}
          title={'Мурашиний алгоритм'}
        />
      </div>
    </div>
  );
};

export default ControlsPanel;
