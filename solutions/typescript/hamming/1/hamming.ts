const ERROR_UNEQUAL_LENGTH_MESSAGE = 'DNA strands must be of equal length.'

export function compute(left: string, right: string): number {
    if (left.length !== right.length) throw new Error(ERROR_UNEQUAL_LENGTH_MESSAGE)
    
    const rightToArray = Array.from(right)

    return Array.from(left).reduce((acc, char, index) => acc += rightToArray[index] !== char ? 1 : 0, 0)
}
