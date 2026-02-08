export function classify(num: number): 'perfect' | 'abundant' | 'deficient' {
    if (1 > num)
        throw new Error('Classification is only possible for natural numbers.')

    const factors: Array<number> = [1]

    for (let i = 2; i < num; i++) {
        if (num % i === 0) factors.push(i)
    }

    const alicuotSum = factors.reduce((sum, factor) => sum + factor, 0)

    if (num === 1 && alicuotSum === 1) return 'deficient'

    return alicuotSum === num ? 'perfect' : alicuotSum > num ? 'abundant' : 'deficient'
}
