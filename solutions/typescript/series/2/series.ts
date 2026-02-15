export class Series {
    readonly #series: number[] = []

    #isDecimalDigit(input: string): boolean {
        return input.charCodeAt(0) >= '0'.charCodeAt(0)
            && input.charCodeAt(0) <= '9'.charCodeAt(0)
    }

    constructor(series: string) {
        if (series.length < 1 )
            throw new Error('series cannot be empty')

        for (const digit of series) {
            if (!this.#isDecimalDigit(digit))
                throw new Error('series must contain only decimal numbers')
            
            this.#series.push(Number(digit))
        }
    }

    slices(sliceLength: number): number[][] {
        if (sliceLength < 0)
            throw new Error('slice length cannot be negative')
        
        if (sliceLength === 0)
            throw new Error('slice length cannot be zero')
        
        if (sliceLength > this.#series.length)
            throw new Error('slice length cannot be greater than series length')

        const slices: number[][] = []
        
        for (let i = 0; i <= this.#series.length - sliceLength; i++) {
            const slice: number[] = []
            
            for (let j = i; j < i + sliceLength; j++) {
                slice.push(this.#series[j])
            }
            
            slices.push(slice)
        }

        return slices
    }
}
