import React, { useState, useCallback } from 'react';
import RandomButton from './RandomButton';
import './CanvasComponent.css';

const NodeGenerator = ({ onNodesGenerated }) => {
  const [nodes, setNodes] = useState([]);
  const [nodeCount, setNodeCount] = useState('');
  const canvasSize = { width: 1000, height: 500 };

  const generateNodes = useCallback(() => {
    const margin = 50;
    const numberOfNewNodes =
      nodeCount > 2 ? nodeCount : Math.floor(Math.random() * 97) + 3;

    const newNodes = [];

    for (let i = 0; i < numberOfNewNodes; i++) {
      const newNode = {
        x: Math.round(Math.random() * (canvasSize.width - 2 * margin) + margin),
        y: Math.round(
          Math.random() * (canvasSize.height - 2 * margin) + margin
        ),
      };
      newNodes.push(newNode);
    }

    console.log(newNodes);
    setNodes(newNodes);
    onNodesGenerated(newNodes);
  }, [canvasSize, onNodesGenerated]);

  return (
    <div className='canvasContainer'>
      <input
        type='number'
        className='input-number'
        value={nodeCount}
        onChange={(e) =>
          setNodeCount(Math.max(0, parseInt(e.target.value, 10) || 0))
        }
        placeholder='Введіть кількість вузлів'
      />
      <RandomButton
        generateNodes={generateNodes}
        text={nodeCount >= 3 ? `Додати ${nodeCount} вузлів` : null}
      />
      <div className={`nodes-info ${nodes.length ? 'visible' : ''}`}>
        Кількість згенерованих вузлів: {nodes.length}
      </div>
    </div>
  );
};

export default NodeGenerator;
