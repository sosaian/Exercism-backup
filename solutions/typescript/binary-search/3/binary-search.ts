export function find(haystack: readonly number[], needle: number): number {
    // This function assumes haystack is an array of numbers sorted in ascending order.
    
    let leftBoundary = 0
    let rightBoundary = haystack.length - 1

    while (leftBoundary <= rightBoundary) {
        const midIndex = Math.floor((leftBoundary + rightBoundary) / 2)
        const currentValue = haystack[midIndex]

        if (needle === currentValue) { return midIndex }

        if (needle > currentValue) { 
            leftBoundary = midIndex + 1
        } else {
            rightBoundary = midIndex - 1
        }
    }

    throw new Error('Value not in array')
}
