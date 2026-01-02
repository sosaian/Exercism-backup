export function score(x: number, y: number): number {
    /*
        outer circle  -> x^2 + y^2 = 100
        middle circle -> x^2 + y^2 = 25
        inner circle  -> x^2 + y^2 = 1
    */

    const aux = (x*x) + (y*y)

    if (aux > 100) return 0
    else if (aux > 25) return 1
    else if (aux > 1) return 5
    else return 10
}
