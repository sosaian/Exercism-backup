export class Squares {
    readonly #limit: number
    readonly #sumOfSquares: number
    readonly #squareOfSum: number

    constructor(count: number) { 
        if (count < 1) { throw new Error('Invalid limit number. Must be bigger than zero.') }
        this.#limit = count
        this.#sumOfSquares = this.#computeSumOfSquares()
        this.#squareOfSum = this.#computeSquareOfSum()
    }

    #computeSumOfSquares(): number {
        return ( this.#limit * (this.#limit + 1) * (2 * this.#limit + 1) ) / 6
    }

    get sumOfSquares(): number { return this.#sumOfSquares }

    #computeSquareOfSum(): number { return ((this.#limit * (this.#limit + 1))/2) ** 2 }

    get squareOfSum(): number { return this.#squareOfSum }

    get difference(): number { return this.#squareOfSum - this.#sumOfSquares }
}
