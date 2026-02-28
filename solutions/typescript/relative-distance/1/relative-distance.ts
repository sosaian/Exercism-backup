// 1. Define our types clearly
type FamilyTree = Record<string, string[]>;
type Graph = Map<string, string[]>;

export function degreesOfSeparation(
  familyTree: FamilyTree,
  start: string,
  target: string
): number {
  // 2. Initialize the graph
  const graph: Graph = new Map();

  // Helper function to create bi-directional (undirected) edges
  const addEdge = (nodeA: string, nodeB: string) => {
    if (!graph.has(nodeA)) graph.set(nodeA, []);
    if (!graph.has(nodeB)) graph.set(nodeB, []);
    
    // The non-null assertion (!) is safe here because we just ensured the keys exist
    graph.get(nodeA)!.push(nodeB);
    graph.get(nodeB)!.push(nodeA);
  };

  // 3. Build the graph from the input data
  for (const [parent, children] of Object.entries(familyTree)) {
    for (let i = 0; i < children.length; i++) {
      // Connect parent to child
      addEdge(parent, children[i]);

      // Connect siblings directly to each other (The "Gotcha" from the README)
      for (let j = i + 1; j < children.length; j++) {
        addEdge(children[i], children[j]);
      }
    }
  }

  // Edge case: Unrelated or non-existent people
  if (!graph.has(start) || !graph.has(target)) {
    return -1;
  }

  // 4. Breadth-First Search (BFS)
  // Queue stores tuples of [currentNode, currentDistance]
  const queue: [string, number][] = [[start, 0]];
  const visited: Set<string> = new Set([start]);

  while (queue.length > 0) {
    // Note: Array.shift() is easy to read but not perfectly optimal for large queues
    const [currentNode, distance] = queue.shift() as [string, number];

    if (currentNode === target) {
      return distance;
    }

    const neighbors = graph.get(currentNode) || [];

    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }

  // If the queue empties and we haven't found the target, they aren't connected
  return -1;
}