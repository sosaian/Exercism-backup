class Node<T> {
    readonly value: T
    next: Node<T> | null
    constructor(element: T, next: Node<T> | null = null ) {
        this.value = element
        this.next = next
    }
}

export class List<T> {
    #head: Node<T> | null = null
    
    private constructor(head: Node<T> | null) { this.#head = head }

    public forEach(fn: (value: T) => void): void {
        let currentNode = this.#head
        
        while (currentNode !== null) {
            fn(currentNode.value)
            currentNode = currentNode.next
        }
    }

    static #appendNode<U>(
        state: { 
            head: Node<U> | null,
            tail: Node<U> | null
        }, value: U
    ): void {
        const newNode = new Node(value)
            
        if (state.head === null || state.tail === null) {
            state.head = newNode
            state.tail = newNode
        } else {
            state.tail.next = newNode
            state.tail = newNode
        }
    }

    public static create<U>(...values: U[]): List<U> {
        const state = {
            head: null as Node<U> | null,
            tail: null as Node<U> | null
        }
        
        for (const value of values) { List.#appendNode(state, value) }
        
        return new List(state.head)
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

    public foldr<U>(
        fn: (acc: U, actual: T) => U,
        initialAcc: U
    ): U { return this.reverse().foldl(fn, initialAcc) }

    public append(list: List<T>): List<T> { 
        const state = {
            head: null as Node<T> | null,
            tail: null as Node<T> | null
        }
        
        this.forEach(value => List.#appendNode(state, value))
        list.forEach(value => List.#appendNode(state, value))
        
        return new List(state.head)
    }

    public concat(lists: List<List<T>>): List<T> { 
        return this.append(lists.foldr(
            (acc: List<T>, current: List<T>) => current.append(acc),
            List.create<T>()
        ))
    }

    public filter(predicate: (value: T) => boolean): List<T> {
        return this.foldr((acc: List<T>, value: T) =>
            predicate(value)
                ? List.create(value).append(acc)
                : acc,
            List.create<T>()
        )
    }

    public length(): number { return this.foldl((acc, _act) => ++acc, 0) }

    public map<U>(fn: (value: T) => U): List<U> {
        return this.foldr((acc: List<U>, value: T) =>
            List.create(fn(value)).append(acc),
            List.create<U>()
        )
    }

    public reverse(): List<T> { 
        let newHead: Node<T> | null = null
        let currentNode = this.#head
        
        while (currentNode !== null) {
            newHead = new Node(currentNode.value, newHead)
            currentNode = currentNode.next
        }
    
        return new List(newHead)
    }
}
