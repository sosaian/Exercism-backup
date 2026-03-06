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

    moves() {
        if (this.#solved === true) { return this.#movesResult }
        
        if (this.goal > Math.max(this.buckOne, this.buckTwo)) {
            throw new Error('Goal larger than both buckets.')
        }

        if (this.goal % gcd(this.buckOne,this.buckTwo) !== 0) {
            throw new Error('It is not possible to reach the goal amount.')
        }

        const source = this.starterBuck === 'one' ? this.buckOne : this.buckTwo
        const target = this.starterBuck === 'one' ? this.buckTwo : this.buckOne
        let sourceAmount = source
        let targetAmount = 0
        let moves = 1 //First fill counts as an action.
        
        if (source === this.goal) {
            this.#solved = true
            this.#movesResult = 1
            this.#goalBucketResult = source === this.buckOne ? 'one' : 'two'
            this.#otherBucketResult = 0
            return 1
        }
        if (target === this.goal) { 
            this.#solved = true
            this.#movesResult = 2
            this.#goalBucketResult = target === this.buckOne ? 'one' : 'two'
            this.#otherBucketResult = source
            return 2
        }
        
        const goalNotReached = () => { 
            return sourceAmount !== this.goal && targetAmount !== this.goal
        }

        while (goalNotReached()) {
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

        this.#solved = true
        this.#movesResult = moves
        if (sourceAmount === this.goal) {
            this.#goalBucketResult = source === this.buckOne ? 'one' : 'two'
        } else {
            this.#goalBucketResult = target === this.buckOne ? 'one' : 'two'
        }
        this.#otherBucketResult = sourceAmount === this.goal ? targetAmount : sourceAmount

        return moves
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
