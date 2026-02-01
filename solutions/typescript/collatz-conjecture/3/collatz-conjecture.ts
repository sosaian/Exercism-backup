export function steps(startNumber: number): number {
    const isValidCollatzInput = 0 < startNumber && Number.isInteger(startNumber)
    
    if (!isValidCollatzInput) throw new Error('Only positive integers are allowed')
    
    let collatzCurrentNumber = startNumber
    let count = 0

    while (collatzCurrentNumber !== 1) {
        count++
        
        if (collatzCurrentNumber % 2 === 0) collatzCurrentNumber /= 2
        else collatzCurrentNumber = 3 * collatzCurrentNumber + 1
    }

    return count
}
