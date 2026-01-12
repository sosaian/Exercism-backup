export class Rational {
    readonly numerator: number
    readonly denominator: number

    constructor(numerator: number, denominator:number ) {   
        if (denominator === 0) { throw new Error('Rational number with denominator = zero') }
        
        this.numerator = numerator
        this.denominator = denominator

        if (this.numerator === 0) { this.denominator = 1 }

        if (this.denominator < 0) {
            this.numerator *= -1
            this.denominator *= -1
        }
    }

    add(addend: Rational): Rational {
        let addNumerator = this.numerator * addend.denominator + addend.numerator * this.denominator
        let addDenominator =  this.denominator * addend.denominator
        
        return new Rational(addNumerator, addDenominator).reduce()
    }

    sub(minuend: Rational): Rational {
        let subNumerator = this.numerator * minuend.denominator - minuend.numerator * this.denominator
        let subDenominator =  this.denominator * minuend.denominator
        
        return new Rational(subNumerator, subDenominator).reduce()
    }

    mul(multiplier: Rational): Rational {
        let mulNumerator = this.numerator * multiplier.numerator
        let mulDenominator =  this.denominator * multiplier.denominator
        
        return new Rational(mulNumerator, mulDenominator).reduce()
    }

    div(divisor: Rational): Rational {
        let divNumerator = this.numerator * divisor.denominator
        let divDenominator =  divisor.numerator * this.denominator
        
        return new Rational(divNumerator, divDenominator).reduce()
    }

    abs(): Rational {
        let numerator = this.numerator < 0 ? this.numerator * -1 : this.numerator
        let denominator = this.denominator < 0 ? this.denominator * -1 : this.denominator

        return new Rational(numerator,denominator).reduce()
    }

    exprational(power: number): Rational {
        let absPower
        let absNumerator
        let absDenominator

        if (power > 0) {
            absPower = power
            absNumerator = this.numerator
            absDenominator = this.denominator
        } else {
            absPower = power * -1
            absNumerator = this.denominator
            absDenominator = this.numerator
        }

        return new Rational(
            absNumerator ** absPower,
            absDenominator ** absPower
        ).reduce()
    }

    expreal(realNumber: number): number { return realNumber ** (this.numerator / this.denominator) }

    #gcd(dividend:number, divisor:number ):number { 
        return divisor === 0 ? dividend : this.#gcd(divisor, dividend % divisor)
    }
    
    // #gcd(dividend: number, divisor: number): number {
    //     let a = dividend
    //     let b = divisor

    //     while (b !== 0) {
    //         let aux = b
    //         b = a % b
    //         a = aux
    //     }
        
    //     return a
    // }

    reduce(): Rational {
        const greatestCommonDivisor = this.#gcd(Math.abs(this.numerator), this.denominator)

        let reducedNumerator = this.numerator / greatestCommonDivisor
        let reducedDenominator = this.denominator / greatestCommonDivisor

        return new Rational(reducedNumerator, reducedDenominator)
    }
}
