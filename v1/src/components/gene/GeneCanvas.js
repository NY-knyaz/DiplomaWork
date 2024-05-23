import React, { useEffect, useRef, useState } from 'react';
import { BiDna } from 'react-icons/bi';
import Chart from '../ant/Chart';
import CalculateButton from './CalculateButton';
import geneticAlgorithm from './algorithm';
import GeneParams from './GeneParams';
import Canvas from '../../aco/canvas';
import '../ant/CanvasComponent.css';

const GeneCanvas = ({ nodes }) => {
  const canvasId = 'geneCanvas';

  const [distances, setDistances] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [route, setRoute] = useState([]);

  const [populationSize, setPopulationSize] = useState(2000);
  const [tournamentSize, setTournamentSize] = useState(4);
  const [mutationRate, setMutationRate] = useState(0.1);
  const [crossoverRate, setCrossoverRate] = useState(0.9);
  const [target, setTarget] = useState(450);
  const [maxGenerations, setMaxGenerations] = useState(200);

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
        geneticAlgorithm(
          nodes,
          populationSize,
          tournamentSize,
          mutationRate,
          crossoverRate,
          target,
          maxGenerations
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
          canvasInstance.drawGABestRoute(node, route[index + 1]);
        }
      });
      canvasInstance.drawGABestRoute(route[route.length - 1], route[0]);
    }
  }, [route, canvasInstance]);

  return (
    <div className='canvasContainer'>
      <h2>Генетичний алгоритм {<BiDna />}</h2>
      <GeneParams
        populationSize={populationSize}
        setPopulationSize={setPopulationSize}
        tournamentSize={tournamentSize}
        setTournamentSize={setTournamentSize}
        mutationRate={mutationRate}
        setMutationRate={setMutationRate}
        crossoverRate={crossoverRate}
        setCrossoverRate={setCrossoverRate}
        target={target}
        setTarget={setTarget}
        maxGenerations={maxGenerations}
        setMaxGenerations={setMaxGenerations}
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
            title={'Генетичний алгоритм'}
          />
        </div>
      )}
    </div>
  );
};

export default GeneCanvas;
