class Node<T> {
    value: T
    next: Node<T> | null
    prev: Node<T> | null

    constructor(element: T, prev: Node<T> | null = null, next: Node<T> | null = null ) {
        this.value = element
        this.prev = prev
        this.next = next
    }
}

export class LinkedList<TElement> {
    head: Node<TElement> | null
    tail: Node<TElement> | null

    constructor() {
        this.head = null
        this.tail = null
    }

    public push(element: TElement): void {
        if (this.tail === null) {
            this.tail = new Node<TElement>(element)
            this.head = this.tail
        } else {
            this.tail.next = new Node<TElement>(element, this.tail)
            this.tail = this.tail.next
        }
    }

    public pop(): TElement {
        if (this.tail === null) { throw new Error('The list is empty.') }

        let poppedNode = this.tail

        if (this.tail === this.head) {
            this.tail = null
            this.head = null
        } else if (this.tail.prev !== null) {
            this.tail.prev.next = null
            this.tail = this.tail.prev
        }

        return poppedNode.value
    }

    public shift(): TElement {
        if (this.head === null) { throw new Error('The list is empty.') }

        let shiftedNode = this.head

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
        } else if (this.head.next !== null) {
            this.head.next.prev = null
            this.head = this.head.next
        }

        return shiftedNode.value
    }

    public unshift(element: TElement): void {
        if (this.head === null) {
            this.head = new Node<TElement>(element)
            this.tail = this.head
        } else {
            this.head.prev = new Node<TElement>(element, null, this.head)
            this.head = this.head.prev
        }
    }

    public delete(element: TElement): void {
        if (this.head === null || this.tail === null) { return }
        
        if (this.head === this.tail) { 
            if ( this.head.value !== element) { return }

            this.head = null
            this.tail = null
            
            return
        }

        if (this.head.value === element) {
            if (this.head.next !== null) { 
                this.head.next.prev = null
                this.head = this.head.next
            }
            
            return
        }
        
        if (this.tail.value === element) {
            if (this.tail.prev !== null) { 
                this.tail.prev.next = null
                this.tail = this.tail.prev
            }
            
            return
        }

        let currentNode: Node<TElement>

        if (this.head.next === null) { return }
        
        currentNode = this.head.next

        do {
            if (currentNode.value === element) {
                if (currentNode.next === null || currentNode.prev === null) { return }
                
                currentNode.next.prev = currentNode.prev
                currentNode.prev.next = currentNode.next

                return
            }

            if (currentNode.next === null) { return }
            currentNode = currentNode.next
        } while (currentNode !== this.tail)
    }

    public count(): number {
        let counter = 0
        
        if (this.head === null) { return counter }

        counter++
        
        if (this.head === this.tail) { return counter }

        let currentNode: Node<TElement>

        if (this.head.next === null) { return counter }
        
        currentNode = this.head.next
        counter++
        
        while (currentNode.next !== null) {
            currentNode = currentNode.next
            counter++
        } 

        return counter
    }
}
