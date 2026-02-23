export class ComplexNumber {
    readonly #real: number
    readonly #imaginary: number
    
    constructor(real: number, imaginary: number) {
        this.#real = real
        this.#imaginary = imaginary
    }

    public get real(): number { return this.#real}

    public get imag(): number { return this.#imaginary }

    public add(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(
            this.#real + other.real,
            this.#imaginary + other.imag
        )
    }

    public sub(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(
            this.#real - other.real,
            this.#imaginary - other.imag
        )
    }

    public div(other: ComplexNumber): ComplexNumber {
        const divReal = ((this.#real * other.real)
                        + (this.#imaginary * other.imag))
                        / ((other.real ** 2) + (other.imag ** 2))

        const divImag = ((this.#imaginary * other.real)
                        - (this.#real * other.imag))
                        / ((other.real ** 2) + (other.imag ** 2))

        return new ComplexNumber(divReal,divImag)
    }

    public mul(other: ComplexNumber): ComplexNumber {
        return new ComplexNumber(
            (this.#real * other.real) - (this.#imaginary * other.imag),
            (this.#imaginary * other.real) + (this.#real * other.imag)
        )
    }

    public get abs(): number { 
        return Math.sqrt((this.#real ** 2) + (this.#imaginary ** 2))
    }

    public get conj(): ComplexNumber {
        return new ComplexNumber(this.#real,this.#imaginary * (-1))
    }

    public get exp(): ComplexNumber {
        return new ComplexNumber(
            Math.exp(this.#real) * Math.cos(this.#imaginary),
            Math.exp(this.#real) * Math.sin(this.#imaginary)
        )
    }
}
