export const square = (num: number): bigint => {
    if (!Number.isInteger(num) || num < 1 || num > 64) {
        throw new Error('Number must be an integer between 1 and 64 inclusive.')
    }

    return 2n ** (BigInt(num) - 1n)
}

export const total = (): bigint => { return (2n ** 64n) - 1n }
