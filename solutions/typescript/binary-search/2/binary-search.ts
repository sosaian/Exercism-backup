export function find(haystack: number[], needle: number): number {
    if (haystack.length < 1) { throw new Error('Value not in array') }
    
    for (let index = 0; index < haystack.length - 1; index++) {
        if (haystack[index] > haystack[index + 1]) { throw new Error('Please provide a sorted array.') }
    }

    if (haystack[0] > needle || haystack[haystack.length - 1] < needle) { throw new Error('Value not in array') }

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
