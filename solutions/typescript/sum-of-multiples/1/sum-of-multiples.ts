export function sum(baseLevelOfItems: number[], levelNumber: number): number {
    if (levelNumber < 2) return 0
    let expSum = 0
    for (let i = 1; i < levelNumber; i++) {
        let isDivisibleByAnyFactor = false
        for (const itemLevel of baseLevelOfItems) {
            if (i % itemLevel === 0) {
                isDivisibleByAnyFactor = true
                break
            }
        }
        if (isDivisibleByAnyFactor) expSum += i
    }
    return expSum
}
