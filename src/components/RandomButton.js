import React from 'react';
import './CanvasComponent.css';

const RandomNodesButton = ({ generateNodes, disabled, text }) => {
  return (
    <button
      className='randomButton'
      onClick={generateNodes}
      disabled={disabled}
      // text={text}
    >
      {text ? text : 'Додати випадкові вузли'}
    </button>
  );
};

export default RandomNodesButton;
