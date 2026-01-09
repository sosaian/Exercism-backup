export function find(haystack: number[], needle: number): number | never {
    if (haystack.length < 1) { throw new Error('Value not in array') }
    
    if (haystack[0] > needle || haystack[haystack.length - 1] < needle) { throw new Error('Value not in array') } // TODO: Check if array is sorted?

    let haystackArray = [...haystack] // TODO: Consider copying when first mutation happens with .toSpliced()?

    let leftBoundary = 0
    let rightBoundary = haystackArray.length - 1
    let midIndex = Math.floor((rightBoundary - leftBoundary) / 2)

    while (leftBoundary < rightBoundary) {
        if (needle === haystackArray[midIndex]) { return midIndex }

        if (needle > haystackArray[midIndex]) { 
            leftBoundary = midIndex + 1
            midIndex += Math.floor((rightBoundary - leftBoundary) / 2) + 1
        } else {
            rightBoundary = midIndex
            midIndex = Math.floor((rightBoundary - leftBoundary) / 2)
        }
    }

    if (haystack[midIndex] === needle) { return midIndex }

    throw new Error('Value not in array')
}
