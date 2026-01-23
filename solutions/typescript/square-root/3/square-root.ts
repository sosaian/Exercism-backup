export function squareRoot(radicand: number): number {
    let lowerBound = 0
    let upperBound = radicand + 1

    while (lowerBound !== upperBound - 1) {
        const mid = Math.floor((lowerBound + upperBound) / 2)
        if (mid * mid <= radicand) {
            lowerBound = mid
        } else { 
            upperBound = mid
        }
    }

    return lowerBound
}
