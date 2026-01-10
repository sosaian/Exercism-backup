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
    #head: Node<TElement> | null = null
    #tail: Node<TElement> | null = null
    #size: number = 0

    public push(element: TElement): void {
        if (this.#tail === null) {
            this.#tail = new Node<TElement>(element)
            this.#head = this.#tail
        } else {
            this.#tail.next = new Node<TElement>(element, this.#tail)
            this.#tail = this.#tail.next
        }

        this.#size++
    }

    public pop(): TElement {
        if (this.#tail === null) { throw new Error('The list is empty.') }

        let poppedNode = this.#tail

        if (this.#tail === this.#head) {
            this.#tail = null
            this.#head = null
        } else if (this.#tail.prev !== null) {
            this.#tail.prev.next = null
            this.#tail = this.#tail.prev
        }

        this.#size--

        return poppedNode.value
    }

    public shift(): TElement {
        if (this.#head === null) { throw new Error('The list is empty.') }

        let shiftedNode = this.#head

        if (this.#head === this.#tail) {
            this.#head = null
            this.#tail = null
        } else if (this.#head.next !== null) {
            this.#head.next.prev = null
            this.#head = this.#head.next
        }

        this.#size--

        return shiftedNode.value
    }

    public unshift(element: TElement): void {
        if (this.#head === null) {
            this.#head = new Node<TElement>(element)
            this.#tail = this.#head
        } else {
            this.#head.prev = new Node<TElement>(element, null, this.#head)
            this.#head = this.#head.prev
        }

        this.#size++
    }

    private findNode(value: TElement): Node<TElement> | null {
        if (this.#size < 1 || this.#head === null || this.#tail === null) { return null }

        if (this.#head.value === value) { return this.#head }

        if (this.#tail.value === value) { return this.#tail }

        let currentNode: Node<TElement>

        if (this.#head.next === null) { return null }

        currentNode = this.#head.next

        while (currentNode.next !== null) {
            if (currentNode.value === value) { return currentNode }

            currentNode = currentNode.next
        }

        return null
    }

    public delete(element: TElement): void {
        let nodeToDelete = this.findNode(element)

        if (nodeToDelete === null) { return }

        if (nodeToDelete.prev === null) {
            if (nodeToDelete.next === null) {
                this.#head === null
                this.#tail === null
            } else {
                nodeToDelete.next.prev = null
                this.#head = nodeToDelete.next
            }
        } else {
            if (nodeToDelete.next === null) {
                nodeToDelete.prev.next = null
                this.#tail = nodeToDelete.prev
            } else {
                nodeToDelete.prev.next = nodeToDelete.next
                nodeToDelete.next.prev = nodeToDelete.prev
            }
        }

        this.#size--
    }

    public count(): number { return this.#size }
}
