import React from 'react';
import '../CanvasComponent.css';

const CalculateButton = ({ onPlayClick, disabled }) => {
  return (
    <button className='playButton' onClick={onPlayClick} disabled={disabled}>
      Розрахувати!
    </button>
  );
};

export default CalculateButton;
