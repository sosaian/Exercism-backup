type Options = {
    minFactor?: number
    maxFactor?: number
    sum: number
}

export function triplets({
    sum,
    minFactor = 1,
    maxFactor = Number.MAX_SAFE_INTEGER
}: Options): Triplet[] {
    const result: Triplet[] = []
    
    // a must be at least minFactor and less than sum / 3
    for (let a = Math.max(minFactor, 1); a <= sum / 3; a++) {
        if (a > maxFactor) continue
        // b starts just above a
        for (let b = Math.max(a + 1, minFactor); b < sum / 2; b++) {
            if (b > maxFactor) continue
            const c = sum - a - b
            
            if (c <= b) continue // enforce a < b < c
            if (c > maxFactor) continue

            if (a * a + b * b === c * c) result.push(new Triplet(a,b,c))
        }
    }
    
    return result
}

class Triplet {
    readonly #a: number
    readonly #b: number
    readonly #c: number

    constructor(a: number, b: number, c: number) {
        const sortedABC = [a,b,c].sort()
        this.#a = sortedABC[0]
        this.#b = sortedABC[1]
        this.#c = sortedABC[2]
    }

    toArray(): [number, number, number] { return [this.#a, this.#b, this.#c] }
}
