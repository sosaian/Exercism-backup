export class Squares {
    readonly #amountNumber: number

    constructor(count: number) { this.#amountNumber = count }

    get sumOfSquares(): number {
        let sum = 0
        for (let i = 0; i <= this.#amountNumber; i++) { sum += i ** 2 }
        return sum
    }

    get squareOfSum(): number {
        let sum = 0
        for (let i = 0; i <= this.#amountNumber; i++) { sum += i }
        return sum ** 2
    }

    get difference(): number { return this.squareOfSum - this.sumOfSquares }
}
