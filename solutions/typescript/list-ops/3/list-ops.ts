class Node<T> {
    readonly value: T
    next: Node<T> | null
    constructor(element: T, next: Node<T> | null = null ) {
        this.value = element
        this.next = next
    }
}

type BuildState<U> = {
    head: Node<U> | null,
    tail: Node<U> | null
}

export class List<T> {
    #head: Node<T> | null = null
    
    private constructor(head: Node<T> | null) { this.#head = head }

    // Creates a new list by adding a value at the front (O(1))
    private prependNode(value: T): List<T> {
        return new List(new Node(value, this.#head))
    }

    // Appends a node while building a list imperatively
    static #appendNode<U>(state: BuildState<U>, value: U): void {
        const newNode = new Node(value)
            
        if (state.head === null || state.tail === null) {
            state.head = newNode
            state.tail = newNode
        } else {
            state.tail.next = newNode
            state.tail = newNode
        }
    }

    // Public constructor
    public static create<U>(...values: U[]): List<U> {
        const state: BuildState<U> = { head: null, tail: null }
        
        for (const value of values) { List.#appendNode(state, value) }
        
        return new List(state.head)
    }

    // Fundamental iteration
    public forEach(fn: (value: T) => void): void {
        let currentNode = this.#head
        
        while (currentNode !== null) {
            fn(currentNode.value)
            currentNode = currentNode.next
        }
    }

    public foldl<U>(
        fn: (acc: U, actual: T) => U,
        initialAcc: U
    ): U {
        let currentNode = this.#head
        let accumulator = initialAcc
        
        while (currentNode !== null) {
            accumulator = fn(accumulator, currentNode.value)
            currentNode = currentNode.next
        }

        return accumulator
    }

    // Implemented via reverse() to remain iterative and stack-safe
    public foldr<U>(
        fn: (acc: U, actual: T) => U,
        initialAcc: U
    ): U { 
        return this.reverse().foldl(fn, initialAcc)
    }

    // Derived operations
    public reverse(): List<T> { 
        return this.foldl(
            (acc: List<T>, value: T) => acc.prependNode(value),
            List.create<T>()
        )
    }

    public map<U>(fn: (value: T) => U): List<U> {
        return this.foldr((acc: List<U>, value: T) =>
            acc.prependNode(fn(value)),
            List.create<U>()
        )
    }

    public filter(predicate: (value: T) => boolean): List<T> {
        return this.foldr((acc: List<T>, value: T) =>
            predicate(value)
                ? acc.prependNode(value)
                : acc,
            List.create<T>()
        )
    }

    public length(): number { return this.foldl((acc, _act) => ++acc, 0) }

    // Structural composition
    public append(list: List<T>): List<T> {         
        if (this.#head === null) { return list }

        const firstNode = new Node(this.#head.value)
        let tail = firstNode

        let currentNode = this.#head.next
        while (currentNode !== null) {
            const newNode = new Node(currentNode.value)
            tail.next = newNode
            tail = newNode
            currentNode = currentNode.next
        }
        
        tail.next = list.#head
        
        return new List(firstNode)
    }

    public concat(lists: List<List<T>>): List<T> { 
        return this.append(lists.foldr(
            (acc: List<T>, current: List<T>) => current.append(acc),
            List.create<T>()
        ))
    }
}
