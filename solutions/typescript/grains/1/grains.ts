export const square = (num: number): bigint => {
    if (num < 1) throw new Error('Number must be greater than zero.')
    if (num > 64) throw new Error('Cannot compute the square of a number greater than 64.')
    return BigInt(2 ** (num - 1))
}

export const total = (): bigint => {
    let totalAmount: bigint = 0n

    for (let i = 1; i < 65; i++) { totalAmount += square(i) }

    return totalAmount
}
