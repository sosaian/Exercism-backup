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

    moves() {
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
        const goalNotReached = () => { 
            return this.goal !== sourceAmount && this.goal !== targetAmount
        }

        while (goalNotReached()) {
            if (sourceAmount === 0) { sourceAmount = source }
            else if (targetAmount === target) { targetAmount = 0 }
            else {
                targetAmount += Math.min(sourceAmount, target - targetAmount)
                sourceAmount -= targetAmount
            }
            
            moves++
        }

        return moves
    }

    get goalBucket(): 'one' | 'two' {
        throw new Error('Remove this line and implement the function')
    }

    get otherBucket() {
        throw new Error('Remove this line and implement the function')
    }
}
