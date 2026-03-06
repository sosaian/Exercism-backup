function gcd(a: number, b: number): number {
    while (b !== 0) {
        const temp = b
        b = a % b
        a = temp
    }
    return a
}

export class TwoBucket {
    constructor(
        private readonly buckOne: number,
        private readonly buckTwo: number,
        private readonly goal: number,
        private readonly starterBuck: 'one' | 'two'
    ) {}

    #solved = false
    #movesResult = 0
    #goalBucketResult: 'one' | 'two' = 'one'
    #otherBucketResult = 0

    #validateInputs(): void {
        if (this.goal > Math.max(this.buckOne, this.buckTwo)) {
            throw new Error('Goal larger than both buckets.')
        }

        if (this.goal % gcd(this.buckOne,this.buckTwo) !== 0) {
            throw new Error('It is not possible to reach the goal amount.')
        }
    }

    #checkShortcuts():
    | { moves: number; goal: 'one' | 'two'; other: number }
    | null {
        const source = this.starterBuck === 'one' ? this.buckOne : this.buckTwo
        const target = this.starterBuck === 'one' ? this.buckTwo : this.buckOne

        if (source === this.goal) {
            return {
                moves: 1,
                goal: this.starterBuck,
                other: 0
            }
        }
        if (target === this.goal) { 
            return {
                moves: 2,
                goal: this.starterBuck === 'one' ? 'two' : 'one',
                other: source
            }
        }

        return null
    }

    #simulate(): {
        moves: number,
        goal: 'one' | 'two',
        other: number
    } {
        const source = this.starterBuck === 'one' ? this.buckOne : this.buckTwo
        const target = this.starterBuck === 'one' ? this.buckTwo : this.buckOne

        let sourceAmount = source
        let targetAmount = 0
        let moves = 1 //First fill counts as an action.

        while (sourceAmount !== this.goal && targetAmount !== this.goal) {
            if (sourceAmount === 0) {
                sourceAmount = source
                moves++
                continue
            }

            if (targetAmount === target) {
                targetAmount = 0
                moves++
                continue
            }
            
            const transferAmount = Math.min(sourceAmount, target - targetAmount)
            targetAmount += transferAmount
            sourceAmount -= transferAmount      
            moves++
        }

        if (sourceAmount === this.goal) {
            return {
                moves,
                goal: this.starterBuck,
                other: targetAmount
            }
        }
        
        return {
            moves,
            goal: this.starterBuck === 'one' ? 'two' : 'one',
            other: sourceAmount
        }
    }

    #commit(result: {
        moves: number,
        goal: 'one' | 'two',
        other: number
    }) {
        this.#solved = true
        this.#movesResult = result.moves
        this.#goalBucketResult = result.goal
        this.#otherBucketResult = result.other
    }

    moves() {
        if (this.#solved === true) { return this.#movesResult }
        
        this.#validateInputs()

        const shortcut = this.#checkShortcuts()
        if (shortcut !== null) {
            this.#commit(shortcut)
            return this.#movesResult
        }

        const result = this.#simulate()
        this.#commit(result)

        return this.#movesResult
    }

    get goalBucket(): 'one' | 'two' {
        if (this.#solved === true) { return this.#goalBucketResult }
        throw new Error('Cannot provide goalBucket until moves() is called.')
    }

    get otherBucket(): number {
        if (this.#solved === true) { return this.#otherBucketResult }
        throw new Error('Cannot provide otherBucket until moves() is called.')
    }
}
