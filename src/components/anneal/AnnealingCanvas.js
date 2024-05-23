import React, { useEffect, useRef, useState } from 'react';
import { FaTemperatureHigh } from 'react-icons/fa';
import Chart from '../Chart';
import CalculateButton from '../CalculateButton';
import simulatedAnnealing from './algorithm';
import AnnealingParams from './AnnealingParams';
import Canvas from '../../aco/canvas';
import '../CanvasComponent.css';

const AnnealingCanvas = ({ nodes }) => {
  const canvasId = 'annealingCanvas';

  const [distances, setDistances] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [route, setRoute] = useState([]);

  const [initialTemperature, setInitialTemperature] = useState(5000);
  const [coolingRate, setCoolingRate] = useState(0.93);
  const [minTemperature, setMinTemperature] = useState(1);
  const [iterationsPerTemperature, setIterationsPerTemperature] = useState(100);

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

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

    window.addEventListener('resize', updateCanvasSize);
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, [canvasSize, nodes]);

  const calculate = () => {
    if (nodes.length) {
      const { bestRoute, distance, generation, distanceHistory } =
        simulatedAnnealing(
          nodes,
          initialTemperature,
          coolingRate,
          minTemperature,
          iterationsPerTemperature
        );
      console.log(
        `Найкращий маршрут має відстань: ${distance}, знайдений на поколінні ${generation}`
      );
      console.log('Best route found:', bestRoute);

      setRoute(bestRoute);
      setDistances(distanceHistory);
      setGenerations([...Array(distanceHistory.length).keys()]);
    }
  };

  useEffect(() => {
    if (canvasInstance && route.length) {
      canvasInstance.setClearAll();
      route.forEach((node, index) => {
        canvasInstance.addNode([node]);
        if (index < route.length - 1) {
          canvasInstance.drawBestRoute(node, route[index + 1]);
        }
      });
      canvasInstance.drawBestRoute(route[route.length - 1], route[0]);
    }
  }, [route, canvasInstance]);

  return (
    <div className='canvasContainer'>
      <h2>Алгоритм Відпалу {<FaTemperatureHigh />}</h2>
      <AnnealingParams
        initialTemperature={initialTemperature}
        setInitialTemperature={setInitialTemperature}
        coolingRate={coolingRate}
        setCoolingRate={setCoolingRate}
        minTemperature={minTemperature}
        setMinTemperature={setMinTemperature}
        iterationsPerTemperature={iterationsPerTemperature}
        setIterationsPerTemperature={setIterationsPerTemperature}
      />
      <CalculateButton onPlayClick={calculate} disabled={!nodes.length} />
      <div id='wrapper2'>
        <canvas
          id={canvasId}
          ref={canvasRef}
          width={window.innerWidth * 0.55}
          height='600'
        />
      </div>
      {distances.length > 0 && (
        <div className='chartContainer'>
          <Chart
            distances={distances}
            generations={generations.map((gen) => gen + 1)}
            title={'Алгоритм Відпалу'}
          />
        </div>
      )}
    </div>
  );
};

export default AnnealingCanvas;
