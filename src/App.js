import React, { useState } from 'react';
import './App.css';

import NodesGenerator from './components/NodesGenerator';
import AntCanvas from './components/ant/AntCanvas';
import GeneCanvas from './components/gene/GeneCanvas';
import AnnealingCanvas from './components/anneal/AnnealingCanvas';

const App = () => {
  const [nodes, setNodes] = useState([]);

  const handleNodesGenerated = (newNodes) => {
    setNodes(newNodes);
  };

  return (
    <div className='App'>
      <h1>Порівняння алгоритмів</h1>
      <NodesGenerator onNodesGenerated={handleNodesGenerated} />
      <AntCanvas nodes={nodes} />
      <GeneCanvas nodes={nodes} />
      <AnnealingCanvas nodes={nodes} />
    </div>
  );
};

export default App;
