import React from 'react';
import '../CanvasComponent.css';

const StopButton = ({ onStopClick, disabled }) => {
  return (
    <button className='stopButton' onClick={onStopClick} disabled={!disabled}>
      Зупинити
    </button>
  );
};

export default StopButton;
