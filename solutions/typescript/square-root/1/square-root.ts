export function squareRoot(radicand: number): number {
    let l = 0
    let a = 1
    let d = 3

    while (a <= radicand) {
        a += d
        d += 2
        l += 1
    }

    return l
    // throw new Error('Remove this line and implement the function')
}
