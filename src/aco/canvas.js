import Environment from './model/environment';
import FabricjsUtils from './utils/fabricjs-utils';
import AntSystem from './ant-system';
import aco from './model/ant';

import { fabric, canvas } from 'fabric';

var OPTIONS = {
  ADD_NODE: 1,
  MOVE_NODE: 2,
};

class Canvas extends fabric.Canvas {
  constructor(canvasId) {
    super(canvasId, {
      selection: false,
      defaultCursor: 'crosshair',
      backgroundColor: 'white',
    });

    // Default Settings
    this.nodesLimit = 200;

    // this.antSpeed = 20;
    this.antSpeed = 1;
    this.animation = null;
    this.isPlay = false;

    // Pan
    this.isDragging = false;
    this.lastPosX = 0;
    this.lastPosY = 0;

    this.environment = new Environment(this);
    this.shortestPath = FabricjsUtils.makeShortestPath(this.environment);
    this.pheromones = null;
    this.generation = 0;

    this.bestTourDistances = [];
    this.generations = [];
    this.updateChartData = null;

    this.selectedOption = null;
    this.index = null;

    this.aco = new AntSystem(this.environment);

    this.setAddNode();
  }

  resize(width, height) {
    this.setDimensions({ width: width, height: height });
    this.calcOffset();
  }

  addNode(positions) {
    if (this.isPlay) {
      return;
    }

    if (this.environment.getNumberOfNodes() >= this.nodesLimit) {
      return;
    }

    positions.forEach((pos) => {
      var node = new aco.Node(pos.x, pos.y);
      var ant = new aco.Ant(this.environment, node);

      this.add(node);
      // this.add(ant);

      this.environment.addNode(node);
      this.environment.addAnt(ant);
    });

    this.environment.init();

    this.aco.initializeTau();

    this.generation = 0;

    this.updateShortestPath();
    this.updatePheromones();

    this.renderAll();

    this.sortCanvas();

    this.fire('generationUpdated', canvas);
    this.fire('addedNode', positions);
  }

  sortCanvas() {
    this._objects.sort((a, b) => (a.layer > b.layer ? 1 : -1));
    this.renderAll();
  }

  drawBestRoute(fromNode, toNode) {
    const line = FabricjsUtils.makeGABestRoute(
      fromNode.x,
      fromNode.y,
      toNode.x,
      toNode.y
    );
    this.add(line);
    this.renderAll();
  }

  outEdges(id) {
    var selected = [];

    this.edges.forEach(function (edge) {
      if (edge.source.id === id) {
        selected.push(edge);
      } else if (edge.target.id === id) {
        selected.push(edge);
      }
    });

    return selected;
  }

  setVisible(el, visible) {
    if (visible) {
      this.add(el);
    } else {
      this.remove(el);
    }
    this.sortCanvas();
  }

  updatePheromones() {
    if (this.pheromones) {
      this.remove(this.pheromones);
      this.pheromones = FabricjsUtils.makeEdges(this.environment);
      this.add(this.pheromones);
      this.sortCanvas();
    }
  }

  updateShortestPath() {
    if (this.shortestPath) {
      this.remove(this.shortestPath);
      this.shortestPath = FabricjsUtils.makeShortestPath(this.environment);
      this.add(this.shortestPath);
      this.sortCanvas();
    }
  }

  updateGeneration() {
    this.generation++;

    this.environment.updateBestTour();

    this.aco.runGlobalPheromoneUpdate();

    this.updateShortestPath();
    this.updatePheromones();

    this.bestTourDistances.push(this.environment.bestTourDistance);
    this.generations.push(this.generation);

    // Виклик методу оновлення графіку, якщо він був переданий
    if (this.updateChartData) {
      this.updateChartData(this.environment.bestTourDistance, this.generation);
    }

    this.fire('generationUpdated', canvas);
  }

  toggleViewPheromones() {
    if (this.pheromones) {
      this.remove(this.pheromones);
      this.pheromones = null;
    } else {
      this.pheromones = FabricjsUtils.makeEdges(this.environment);
      this.add(this.pheromones);
      this.sortCanvas();
    }
  }

  toggleViewShortestPath() {
    if (this.shortestPath) {
      this.remove(this.shortestPath);
      this.shortestPath = null;
    } else {
      this.shortestPath = FabricjsUtils.makeShortestPath(this.environment);
      this.add(this.shortestPath);
      this.sortCanvas();
    }
  }

  setAddNode() {
    this.defaultCursor = 'crosshair';
    this.selectedOption = OPTIONS.ADD_NODE;
    this.lockCanvas(true);
  }

  setAntSpeed(value) {
    this.antSpeed = value;
  }

  setClearAll() {
    this.clear();
    aco.Node.NODE_ID = 0;
    this.environment.nodes = [];
    this.environment.ants = [];
  }

  lockCanvas(lock) {
    this.environment.ants.forEach((ant) => {
      ant.set({
        selectable: !lock,
        evented: !lock,
      });
    });
    this.discardActiveObject().renderAll();
  }

  setPlay() {
    if (this.isPlay) {
      return;
    }
    console.log(this.environment.alpha);
    console.log(this.environment.beta);
    console.log(this.environment.rho);
    if (this.environment.getNumberOfNodes() <= 1) {
      throw new Error('You need at least 2 nodes to play');
    }

    this.isPlay = true;

    this.lockCanvas(true);

    this.moveAnts();
  }

  setStop() {
    this.isPlay = false;
    this.lockCanvas(true);
  }

  moveAnts() {
    this.fire('running', {});

    let that = this;

    let segments = [];
    let nextNodes = [];

    that.environment.ants.forEach((ant) => {
      ant.initializeNodesToVisit(that.environment);

      let currentNode = that.environment.findNodeById(ant.currentNodeId);
      let nextNode = that.aco.getNextNode(ant);

      let distances = FabricjsUtils.getEuclideanDistance(currentNode, nextNode);

      segments.push(distances / that.antSpeed);
      nextNodes.push(nextNode);
    });

    var render = function () {
      let isMoveDone = true;

      for (let i = 0; i < that.environment.ants.length; i++) {
        let ant = that.environment.ants[i];
        let isAntDone = that.moveAnt(ant, nextNodes[i], segments[i]);
        isMoveDone = isMoveDone && isAntDone;
      }

      that.renderAll();

      if (isMoveDone) {
        if (that.environment.isGenerationDone()) {
          that.updateGeneration();
        }

        if (that.isPlay) {
          that.moveAnts();
        } else {
          that.fire('stopped', {});
        }
      } else {
        window.requestAnimationFrame(render);
      }
    };

    window.requestAnimationFrame(render);
  }

  moveAnt(ant, nextNode, segments) {
    let that = this;

    let isMoveDone = FabricjsUtils.move(ant, nextNode, segments);

    if (isMoveDone) {
      if (that.aco.localUpdating) {
        that.aco.localUpdating.execute(ant.currentNodeId, nextNode.id);
      }

      ant.setCurrentNode(nextNode);
    }

    return isMoveDone;
  }

  getBestTourDistances() {
    return this.bestTourDistances;
  }
}

export default Canvas;
