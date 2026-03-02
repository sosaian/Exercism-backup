function gcd(a: bigint, b: bigint): bigint {
    while (b !== 0n) {
        const temp = b
        b = a % b
        a = temp
    }
    return a
}

function lcm(a: bigint, b: bigint): bigint {
    return (a / gcd(a,b)) * b //Division first prevents overflow growth
}

function sumOfMultiplesBelowN(k: bigint, N: bigint): bigint {
    const m = (N - 1n) / k
    return k * ((m * (m + 1n)) / 2n)
}

function sumRecursive(factors: bigint[], N: bigint): bigint {
    let total = 0n

    function explore(
        startIndex: number,
        currentLCM: bigint,
        subsetSize: number
    ) {
        for (let i = startIndex; i < factors.length; i++) {
            const newLCM = lcm(currentLCM, factors[i])

            if (newLCM >= N) continue

            const contribution = sumOfMultiplesBelowN(newLCM, N)

            if ((subsetSize + 1) % 2 === 1)
                total += contribution
            else
                total -= contribution

            explore(i + 1, newLCM, subsetSize + 1)
        }
    }

    explore(0, 1n, 0)

    return total
}

export function sum(baseLevelOfItems: number[], levelNumber: number): number {
    const validItemLevels = Array.from(new Set(baseLevelOfItems))
                                .filter(item => item > 0 && item < levelNumber)

    if (validItemLevels.length === 0) return 0

    const factors = validItemLevels.map(BigInt)
    const N = BigInt(levelNumber)

    const result = sumRecursive(factors, N)
    
    return Number(result)
}
