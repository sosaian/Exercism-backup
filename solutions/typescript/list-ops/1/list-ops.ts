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
    
    public static create<U>(...values: U[]): List<U> {
        let head: Node<U> | null = null
        let tail: Node<U> | null = null
        
        for (const value of values) {
            const newNode = new Node(value)
            
            if (head === null || tail === null) {
                head = newNode
                tail = newNode
            } else {
                tail.next = newNode
                tail = newNode
            }
        }
        
        return new List(head)
    }

    public append(list: List<T>): List<T> { 
        let newHead: Node<T> | null = null
        let currentTail: Node<T> | null = null
        
        this.forEach((currentNodeValue: T) => {
            const newNode = new Node(currentNodeValue)
            
            if (newHead === null || currentTail === null) {
                newHead = newNode
                currentTail = newNode
            } else {
                currentTail.next = newNode
                currentTail = newNode
            }
        })

        list.forEach((currentNodeValue: T) => {
            const newNode = new Node(currentNodeValue)
            
            if (newHead === null || currentTail === null) {
                newHead = newNode
                currentTail = newNode
            } else {
                currentTail.next = newNode
                currentTail = newNode
            }
        })

        return new List(newHead)
    }

    public concat(list: List<List<T>>): List<T> { 
        let accumulator: List<T> = this

        list.forEach((innerList: List<T>) => {
            accumulator = accumulator.append(innerList)
        })

        return accumulator
    }

    public filter(predicate: (value: T) => boolean): List<T> { 
        let newHead: Node<T> | null = null
        let currentTail: Node<T> | null = null
        
        this.forEach((currentNodeValue: T) => {
            const filterCondition = predicate(currentNodeValue)
            if (filterCondition) {
                const newNode = new Node(currentNodeValue)
            
                if (newHead === null || currentTail === null) {
                    newHead = newNode
                    currentTail = newNode
                } else {
                    currentTail.next = newNode
                    currentTail = newNode
                }
            }
        })

        return new List(newHead)
    }

    public length(): number { 
        let count: number = 0

        this.forEach(() => ++count)

        return count
    }

    public map(fn: (value: T) => T): List<T> {
        let newHead: Node<T> | null = null
        let currentTail: Node<T> | null = null
        
        this.forEach((currentNodeValue: T) => {
            const modifiedValue = fn(currentNodeValue)
            const newNode = new Node(modifiedValue)
            
            if (newHead === null || currentTail === null) {
                newHead = newNode
                currentTail = newNode
            } else {
                currentTail.next = newNode
                currentTail = newNode
            }
        })

        return new List(newHead)
    }

    public foldl<U>(fn: (acc: U, actual: T) => U, initialAcc: U): U {
        let currentNode = this.#head
        let accumulator = initialAcc
        
        while (currentNode !== null) {
            accumulator = fn(accumulator, currentNode.value)
            currentNode = currentNode.next
        }

        return accumulator
    }

    public foldr<U>(fn: (acc: U, actual: T) => U, initialAcc: U): U {
        return this.reverse().foldl(fn, initialAcc)
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

