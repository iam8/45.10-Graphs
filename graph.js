

/** Individual node for a graph. */
class Node {
    constructor(value, adjacent = new Set()) {
        this.value = value;
        this.adjacent = adjacent;
    }
}


class Graph {
    constructor() {
        this.nodes = new Set();
    }

    // this function accepts a Node instance and adds it to the nodes property on the graph
    addVertex(vertex) {
        this.nodes.add(vertex);
    }

    // this function accepts an array of Node instances and adds them to the nodes property on the
    // graph
    addVertices(vertexArray) {
        for (let vertex of vertexArray) {
            this.addVertex(vertex);
        }
    }

    // this function accepts two vertices and updates their adjacent values to include the other
    // vertex
    addEdge(v1, v2) {
        v1.adjacent.add(v2);
        v2.adjacent.add(v1);
    }

    // this function accepts two vertices and updates their adjacent values to remove the other
    // vertex
    removeEdge(v1, v2) {
        v1.adjacent.delete(v2);
        v2.adjacent.delete(v1);
    }

    // this function accepts a vertex and removes it from the nodes property, it also updates any
    // adjacency lists that include that vertex
    removeVertex(vertex) {
        for (let adj of vertex.adjacent) {
            this.removeEdge(vertex, adj);
        }

        this.nodes.delete(vertex);
    }

    // this function returns an array of Node values using DFS
    depthFirstSearch(start) {
        const toVisitStack = [start];
        const visited = new Set();

        while (toVisitStack.length) {
            const current = toVisitStack.pop();
            visited.add(current.value);

            for (let adj of current.adjacent) {
                if (!visited.has(adj.value) && !toVisitStack.includes(adj)) {
                    toVisitStack.push(adj);
                }
            }

        }

        return [...visited];
    }

    // Recursive implementation of depthFirstSearch() method above, just for fun. This method feels
    // more natural to me and easier because you don't have to keep track of a 'toVisit' stack (or
    // queue).
    depthFirstRecursive(start) {
        if (!start) return [];

        const visited = new Set();

        const dfsHelper = (node) => {
            visited.add(node.value);

            for (let adj of node.adjacent) {
                if (!visited.has(adj.value)) {
                    dfsHelper(adj);
                }
            }
        }

        dfsHelper(start);
        return [...visited];
    }

    // this function returns an array of Node values using BFS
    breadthFirstSearch(start) {
        const toVisitQueue = [start];
        const visited = new Set();

        while (toVisitQueue.length) {
            const current = toVisitQueue.shift();
            visited.add(current.value);

            for (let adj of current.adjacent) {
                if (!visited.has(adj.value) && !toVisitQueue.includes(adj)) {
                    toVisitQueue.push(adj);
                }
            }
        }

        return [...visited];
    }
}


module.exports = {Graph, Node}
