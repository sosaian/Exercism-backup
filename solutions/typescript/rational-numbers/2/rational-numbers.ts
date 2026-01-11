export class Rational {
    numerator: number
    denominator: number

    constructor(numerator: number, denominator:number ) {
        this.numerator = numerator
        this.denominator = denominator
    }

    add(addend: Rational): Rational {
        let addNumerator = this.numerator * addend.denominator + addend.numerator * this.denominator
        let addDenominator =  this.denominator * addend.denominator

        if (addDenominator === 0) { throw new Error('Rational number with denominator = zero') }
        if (addNumerator === 0) { return new Rational(addNumerator, 1) }
        
        return new Rational(addNumerator, addDenominator)
    }

    sub(minuend: Rational): Rational {
        let subNumerator = this.numerator * minuend.denominator - minuend.numerator * this.denominator
        let subDenominator =  this.denominator * minuend.denominator

        if (subDenominator === 0) { throw new Error('Rational number with denominator = zero') }
        if (subNumerator === 0) { return new Rational(subNumerator, 1) }
        
        return new Rational(subNumerator, subDenominator)
    }

    mul(multiplier: Rational): Rational {
        let mulNumerator = this.numerator * multiplier.numerator
        let mulDenominator =  this.denominator * multiplier.denominator

        if (mulDenominator === 0) { throw new Error('Rational number with denominator = zero') }
        if (mulNumerator === 0) { return new Rational(mulNumerator, 1) }
        
        return new Rational(mulNumerator, mulDenominator).reduce()
    }

    div(divisor: Rational): Rational {
        let divNumerator = this.numerator * divisor.denominator
        let divDenominator =  divisor.numerator * this.denominator

        if (divDenominator === 0) { throw new Error('Rational number with denominator = zero') }
        if (divNumerator === 0) { return new Rational(divNumerator, 1) }
        
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

    // #gcd(dividend:number, divisor:number ):number { 
    //     return divisor === 0 ? dividend : this.#gcd(divisor, dividend % divisor)
    // }
    
    #gcd(dividend: number, divisor: number): number {
        let a = dividend
        let b = divisor

        while (b !== 0) {
            let aux = b
            b = a % b
            a = aux
        }
        
        return a
    }

    reduce(): Rational {
        const greatestCommonDivisor = this.#gcd(this.numerator, this.denominator)

        let reducedNumerator = this.numerator / greatestCommonDivisor
        let reducedDenominator = this.denominator / greatestCommonDivisor

        if (reducedDenominator < 0) {
            reducedNumerator *= -1
            reducedDenominator *= -1
        }

        return new Rational(reducedNumerator, reducedDenominator)
    }
}
