export function steps(count: number): number {
    const validNumber = 0 < count && Number.isInteger(count)
    
    if (!validNumber) throw new Error('Only positive integers are allowed')

    if (count === 1) return 0
    if (count % 2 === 0) return 1 + steps(Math.round(count / 2))
    return 1 + steps(count * 3 + 1)
}
