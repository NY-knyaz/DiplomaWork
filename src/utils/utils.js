function calculateDistance(nodeA, nodeB) {
  return Math.sqrt((nodeB.x - nodeA.x) ** 2 + (nodeB.y - nodeA.y) ** 2);
}

export default calculateDistance;
