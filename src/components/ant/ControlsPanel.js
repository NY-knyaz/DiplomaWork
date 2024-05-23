import React from 'react';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import Chart from './Chart.js';

const ControlsPanel = ({
  onPlayClick,
  onStopClick,
  distances,
  generations,
  isPlaying,
}) => {
  return (
    <div>
      {/* <PlayButton onPlayClick={onPlayClick} />
      <StopButton onStopClick={onStopClick} disabled={isPlaying} /> */}
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
