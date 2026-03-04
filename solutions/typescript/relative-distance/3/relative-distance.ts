type FamilyTree = Record<string, string[]>
type Graph = Map<string, string[]>

export function degreesOfSeparation(
    familyTree: FamilyTree,
    start: string,
    target: string
): number {
    const graph: Graph = new Map()
    /**
     * Only individuals participating in at least one relationship are inserted
     * into the graph. The input guarantees unique names and relational entries,
     * so additional normalization (e.g., pre-registering isolated nodes or 
     * enforcing stricter domain models) is intentionally omitted to keep the
     * solution aligned with the exercise scope.
     */

    /**
     * Although the input defines parent -> child relationships,
     * degree of separation is symmetric. The family tree is therefore
     * modeled as an undirected graph so connections can be traversed
     * both upward (child -> parent) and downward (parent -> child)
     */
    const addEdge = (nodeA: string, nodeB: string) => {
        let graphNodeA = graph.get(nodeA)
        if (graphNodeA === undefined) {
            graphNodeA = []
            graph.set(nodeA, graphNodeA)
        }
        graphNodeA.push(nodeB)
        
        let graphNodeB = graph.get(nodeB)
        if (graphNodeB === undefined) {
            graphNodeB = []
            graph.set(nodeB, graphNodeB)
        }
        graphNodeB.push(nodeA)
    }

    /**
     * The exercise defines siblings as separation 1. Although they are already
     * connected through a shared parent, direct edges are added to reflect that
     * domain rule rather than biological distance.
     */
    for (const [parent, children] of Object.entries(familyTree)) {
        for (let i = 0; i < children.length; i++) {
            addEdge(parent, children[i])

            for (let j = i + 1; j < children.length; j++) { 
                addEdge(children[i], children[j])
            }
        }
    }

    if (!graph.has(start) || !graph.has(target)) { return -1 }

    const queue: [string, number][] = [[start, 0]]
    const visited: Set<string> = new Set([start])

    /**
     * Breadth-First Search is used because in an unweighted graph it guarantees
     * the shortest path between two nodes, which corresponds to the minimum
     * degree of separation.
     */
    while (queue.length > 0) {
        const item = queue.shift()
        if (item === undefined) {
            throw new Error('Queue invariant violated: shift() return undefined')
        }
        const [currentNode, distance] = item

        if (currentNode === target) { return distance }

        /**
         * Every node added to the queue must already exist in the graph.
         * If this condition fails, the graph construction invariant
         * has been violated.
         */
        const neighbors = graph.get(currentNode)
        if (neighbors === undefined) {
            throw new Error(`Graph invariant violated: missing node ${currentNode}`)
        }

        for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor)
                queue.push([neighbor, distance + 1])
            }
        }
    }

    /**
     * If BFS completes without reaching the target, no path exists between
     * the individuals in the provided data. The exercise contract specifies
     * returning -1 to represent no known relationship.
     */
    return -1
}