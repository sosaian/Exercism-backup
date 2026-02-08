type factorSum = 'perfect' | 'abundant' | 'deficient'

export function classify(value: number): factorSum {
    if (value < 1)
        throw new Error('Classification is only possible for natural numbers.')

    if (1 === value) return 'deficient' // Edge case.

    const factors: number[] = []

    for (let i = 2; i < value; i++) {
        if (value % i === 0) factors.push(i)
    }

    const factorSum: number = factors.reduce((sum, factor) => sum + factor, 1)

    return factorSum === value ? 'perfect' : factorSum > value ? 'abundant' : 'deficient'
}
