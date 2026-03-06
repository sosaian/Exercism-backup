type SolveResult = {
    moves: number
    goal: 'one' | 'two'
    other: number
}

/**
 * The water jug problem has a mathematical constraint:
 * A target volume is reachable only if it is a multiple of gcd(a, b).
 * This follows from Bézout's identity: every measurable amount
 * must be expressible as `ax + by`
 */
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
    #solvedResult: SolveResult = { moves: 0, goal: 'one', other: 0 }

    #validateInputs(): void {
        /**
         * Two impossible scenarios are ruled out early:
         * 1) The goal exceeds both bucket capacities.
         * 2) The goal is not reachable according to the gcd constraint.
         */
        if (this.goal > Math.max(this.buckOne, this.buckTwo)) {
            throw new Error('Goal larger than both buckets.')
        }

        if (this.goal % gcd(this.buckOne,this.buckTwo) !== 0) {
            throw new Error('It is not possible to reach the goal amount.')
        }
    }

    #commit(result: SolveResult) {
        this.#solved = true
        this.#solvedResult = result
    }

    /**
     * Handles trivial cases before running the simulation.
     * The simulation always begins with the starter bucket filled,
     * so these cases must be resolved up to produce the correct
     * minimal move count.
     */
    #checkShortcuts(): SolveResult | null {
        const source = this.starterBuck === 'one' ? this.buckOne : this.buckTwo
        const target = this.starterBuck === 'one' ? this.buckTwo : this.buckOne

        if (source === this.goal) { 
            return { moves: 1, goal: this.starterBuck, other: 0 }
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

    #simulate(): SolveResult {
        const source = this.starterBuck === 'one' ? this.buckOne : this.buckTwo
        const target = this.starterBuck === 'one' ? this.buckTwo : this.buckOne

        let sourceAmount = source
        let targetAmount = 0
        let moves = 1 //First fill counts as an action.

        /**
         * Deterministic simulation of the classic jug strategy:
         *    1. Pour from source -> target whenever possible.
         *    2. Refill source when empty.
         *    3. Empty target when full.
         * These rules guarantee progress because the reachable states
         * follow the modular sequence: (k * source) mod target.
         */
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

        //targetAmount === this.goal
        return {
            moves,
            goal: this.starterBuck === 'one' ? 'two' : 'one',
            other: sourceAmount
        }
    }

    moves() {        
        if (this.#solved === true) { return this.#solvedResult.moves }
        
        this.#validateInputs()

        const shortcut = this.#checkShortcuts()
        if (shortcut !== null) {
            this.#commit(shortcut)
            return this.#solvedResult.moves
        }

        this.#commit(this.#simulate())

        return this.#solvedResult.moves
    }

    get goalBucket(): 'one' | 'two' {
        if (this.#solved === true) { return this.#solvedResult.goal }
        throw new Error('Cannot provide goalBucket until moves() is called.')
    }

    get otherBucket(): number {
        if (this.#solved === true) { return this.#solvedResult.other }
        throw new Error('Cannot provide otherBucket until moves() is called.')
    }
}
