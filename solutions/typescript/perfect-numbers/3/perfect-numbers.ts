type factorSum = 'perfect' | 'abundant' | 'deficient'

export function classify(value: number): factorSum {
    if (value < 1)
        throw new Error('Classification is only possible for natural numbers.')

    if (1 === value) return 'deficient' // Edge case.

    let factorSum: number = 1

    const sqrtValue = Math.floor(Math.sqrt(value))

    for (let i = 2; i <= sqrtValue; i++) {
        if (value % i !== 0) continue
        
        factorSum += i
        
        const pairedFactor = value / i // if `i` is a factor, then `value / i` is also a factor.
        
        if (i === pairedFactor) continue
        
        factorSum += pairedFactor
    }

    return factorSum === value ? 'perfect' : factorSum > value ? 'abundant' : 'deficient'
}
