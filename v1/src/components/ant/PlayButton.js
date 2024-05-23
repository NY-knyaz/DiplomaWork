import React from 'react';
import './CanvasComponent.css';

const PlayButton = ({ onPlayClick, disabled }) => {
  return (
    <button className='playButton' onClick={onPlayClick} disabled={disabled}>
      Розрахувати!
    </button>
  );
};

export default PlayButton;
