type Options = {
    minFactor?: number
    maxFactor?: number
    sum: number
}

export function triplets({
    sum,
    minFactor = 1,
    maxFactor = sum - 2
}: Options): Triplet[] {
    const result: Triplet[] = []
    
    /**
     * Since `a < b < c` and `a + b + c = sum`, the smallest possible values for
     * `b` and `c` are `a+1` and `a+2`, therefore `a` cannot exceed `sum/3`.
     */
    for (let a = Math.max(minFactor, 1); a <= sum / 3; a++) {
        /**
         * Value increase monotonically, so once exceeding maxFactor
         * we can stop iterating.
         */
        if (a > maxFactor) break

        // b starts just above a
        for (let b = Math.max(a + 1, minFactor); b < (sum - a) / 2; b++) {
            if (b > maxFactor) break
            
            const c = sum - a - b
            
            if (c > maxFactor) continue

            if (a * a + b * b === c * c) result.push(new Triplet(a,b,c))
        }
    }
    
    return result
}

class Triplet {
    constructor(
        private readonly a: number,
        private readonly b: number,
        private readonly c: number
    ) {
        if (a >= b || b >= c) { throw new Error('Arguments need to be a < b < c') }
    }

    toArray(): [number, number, number] { return [this.a, this.b, this.c] }
}
