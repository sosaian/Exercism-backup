export function squareRoot(radicand: number): number {
    let left = 0
    let right = radicand + 1

    while (left !== right - 1) {
        const medium = (left + right) / 2
        if (medium * medium <= radicand) {
            left = medium
        } else { 
            right = medium
        }
    }

    return left
}
