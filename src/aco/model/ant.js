import FabricjsUtils from '../utils/fabricjs-utils';
import ArrayUtils from '../utils/array-utils';

const fabric = require('fabric').fabric;

const ANT_IMAGE = document.getElementById('ant-image');

var aco = aco || {};

class Ant extends fabric.Image {
  static ANT_ID = 0;

  constructor(environment, node) {
    super(ANT_IMAGE, {
      id: Ant.ANT_ID++,
      left: node.left,
      top: node.top,
      layer: FabricjsUtils.LAYER.ANT,
      initialNodeId: node.id,
      currentNodeId: node.id,
      currentNode: node,
      ...FabricjsUtils.getDefaultSettings(),
    });

    this.environment = environment;

    this.scaleToWidth(FabricjsUtils.NODE_RADIUS * 2);
    this.scaleToHeight(FabricjsUtils.NODE_RADIUS * 2);

    this.on('moving', (event) => this.onMoving(event));

    this.tourDistance = 0.0;
    this.path = ArrayUtils.newMatrix(0, 0, 0);

    this.nodeIdsToVisit = [];
    this.visitedNodeIds = [];
  }

  initializeNodesToVisit(environment) {
    if (this.visitedNodeIds.length === environment.getNumberOfNodes()) {
      this.nodeIdsToVisit.push(this.initialNodeId);
    }

    if (this.nodeIdsToVisit.length !== 0) {
      return;
    }

    this.tourDistance = 0.0;
    this.path = ArrayUtils.newMatrix(
      environment.getNumberOfNodes(),
      environment.getNumberOfNodes(),
      0
    );

    this.currentNodeId = this.initialNodeId;
    this.visitedNodeIds = [this.initialNodeId];
    this.nodeIdsToVisit = environment.nodes
      .map((n) => n.id)
      .filter((id) => id !== this.initialNodeId);
  }

  onMoving(event) {
    this.currentNode.set({
      top: this.top,
      left: this.left,
    });
    this.currentNode.setCoords();
  }

  isGenerationDone() {
    return this.currentNodeId === this.initialNodeId;
  }

  setCurrentNode(node) {
    this.tourDistance += this.environment.getDistance(
      this.currentNodeId,
      node.id
    );
    this.path[this.currentNodeId][node.id] = this.path[node.id][
      this.currentNodeId
    ] = 1;

    this.visitedNodeIds.push(node.id);

    this.currentNode = node;
    this.currentNodeId = node.id;

    this.set({
      top: node.top,
      left: node.left,
    });
    this.setCoords();

    this.nodeIdsToVisit = this.nodeIdsToVisit.filter((id) => id !== node.id);
  }
}

aco.Ant = Ant;

class Node extends fabric.Group {
  static NODE_ID = 0;

  constructor(x, y) {
    super([], {
      selectable: false,
      evented: false,
      layer: FabricjsUtils.LAYER.NODE,
      ...FabricjsUtils.getDefaultSettings(),
    });

    let nodeId = Node.NODE_ID++;

    this.set({
      id: nodeId,
    });

    this.addWithUpdate(FabricjsUtils.makeCircle(x, y));
    this.addWithUpdate(FabricjsUtils.makeText(x, y, nodeId));
  }
}

aco.Node = Node;

export default aco;
