import React, { useRef, useEffect, useState } from 'react';
import Canvas from '../../aco/canvas.js';
import AntParams from './AntParams.js';
import PlayButton from './PlayButton';
import StopButton from './StopButton';
import ControlsPanel from './ControlsPanel.js';
import { HiOutlineBugAnt } from 'react-icons/hi2';
import '../CanvasComponent.css';

const AntCanvas = ({ nodes }) => {
  const canvasId = 'antCanvas';

  const [distances, setDistances] = useState([]);
  const [generations, setGenerations] = useState([]);

  const [pheromone, setPheromone] = useState(1.0);
  const [heuristic, setHeuristic] = useState(2.0);
  const [evaporation, setEvaporation] = useState(0.1);

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [canvasSize, setCanvasSize] = useState({
    width: window.innerWidth * 0.55,
    height: 500,
  });

  const updateCanvasSize = () => {
    if (canvasRef.current && canvasRef.current.parentElement) {
      setCanvasSize({
        width: canvasRef.current.parentElement.offsetWidth * 0.8,
        height: canvasRef.current.parentElement.offsetHeight * 0.7,
      });
    }
  };

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const instance = new Canvas(canvasId, canvasElement);
    instance.resize(canvasSize.width, canvasSize.height);

    setCanvasInstance(instance);

    if (nodes.length) {
      instance.setClearAll();
      nodes.forEach((node) => instance.addNode([node]));
    }
    // instance.setAntSpeed(20);

    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [canvasSize, nodes]);

  const onPlayClick = () => {
    if (canvasInstance) {
      canvasInstance.environment.alpha = parseFloat(pheromone);
      canvasInstance.environment.beta = parseFloat(heuristic);
      canvasInstance.environment.rho = parseFloat(evaporation);
      canvasInstance.setPlay();
      setIsPlaying(canvasInstance.isPlay);
    }
  };

  const onStopClick = () => {
    if (canvasInstance) {
      canvasInstance.setStop();
      setIsPlaying(canvasInstance.isPlay);
    }
  };

  useEffect(() => {
    if (canvasInstance) {
      // Передача функції, яка оновлює стани відстаней та поколінь
      canvasInstance.updateChartData = (distance, generation) => {
        setDistances((prev) => [...prev, distance]);
        setGenerations((prev) => [...prev, generation]);
      };
    }
  }, [canvasInstance]);

  return (
    <div className='canvasContainer'>
      <h2>
        {'Мурашиний алгоритм  '}
        <HiOutlineBugAnt />
      </h2>
      <AntParams
        pheromone={pheromone}
        setPheromone={setPheromone}
        heuristic={heuristic}
        setHeuristic={setHeuristic}
        evaporation={evaporation}
        setEvaporation={setEvaporation}
      />
      <PlayButton onPlayClick={onPlayClick} disabled={!nodes.length} />
      <StopButton onStopClick={onStopClick} disabled={isPlaying} />
      <div id='wrapper'>
        <canvas
          id={canvasId}
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
        />
      </div>
      {nodes.length ? (
        <ControlsPanel
          onPlayClick={onPlayClick}
          onStopClick={onStopClick}
          distances={distances}
          generations={generations}
          isPlaying={isPlaying}
        />
      ) : null}
    </div>
  );
};

export default AntCanvas;
