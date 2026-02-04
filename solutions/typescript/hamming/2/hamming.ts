const ERROR_UNEQUAL_LENGTH_MESSAGE = 'DNA strands must be of equal length.'

export function compute(left: string, right: string): number {
    if (left.length !== right.length) throw new Error(ERROR_UNEQUAL_LENGTH_MESSAGE)
    
    let hammingDistance = 0

    for (let i = 0; i < left.length; i++) { hammingDistance += right[i] !== left[i] ? 1 : 0 }

    return hammingDistance
}
