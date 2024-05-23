import React, { useEffect, useRef, useState } from 'react';
import { SiSwarm } from 'react-icons/si';
import Chart from '../ant/Chart';
import CalculateButton from '../gene/CalculateButton';
import runPSO from './algorithm';
import Canvas from '../../aco/canvas';
import PSOParams from './PSOParams';
import '../CanvasComponent.css';

const PSOCanvas = ({ nodes }) => {
  const canvasId = 'psoCanvas';

  const [distances, setDistances] = useState([]);
  const [generations, setGenerations] = useState([]);
  const [route, setRoute] = useState([]);

  const [numParticles, setNumParticles] = useState(200);
  const [iterations, setIterations] = useState(100);
  const [inertiaWeight, setInertiaWeight] = useState(0.5);
  const [cognitiveWeight, setCognitiveWeight] = useState(1.5);
  const [socialWeight, setSocialWeight] = useState(1.5);

  const canvasRef = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const instance = new Canvas('psoCanvas', canvasElement);
    instance.resize(window.innerWidth * 0.55, 500);

    setCanvasInstance(instance);

    if (nodes.length) {
      instance.setClearAll();
      nodes.forEach((node) => instance.addNode([node]));
    }
  }, [nodes]);

  const calculate = () => {
    if (nodes.length) {
      const { bestRoute, distance, generation, distanceHistory } = runPSO(
        nodes,
        numParticles,
        iterations,
        inertiaWeight,
        cognitiveWeight,
        socialWeight
      );
      console.log(`Best route found: ${bestRoute} on ${generation}`);
      console.log(`Distance: ${distance}`);
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
      <h2>Алгоритм рою частинок {<SiSwarm />}</h2>
      <PSOParams
        numParticles={numParticles}
        setNumParticles={setNumParticles}
        iterations={iterations}
        setIterations={setIterations}
        inertiaWeight={inertiaWeight}
        setInertiaWeight={setInertiaWeight}
        cognitiveWeight={cognitiveWeight}
        setCognitiveWeight={setCognitiveWeight}
        socialWeight={socialWeight}
        setSocialWeight={setSocialWeight}
      />
      <CalculateButton onPlayClick={calculate} disabled={!nodes.length} />
      <div id='wrapper3'>
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
            generations={generations}
            title={'Алгоритм рою частинок'}
          />
        </div>
      )}
    </div>
  );
};

export default PSOCanvas;
