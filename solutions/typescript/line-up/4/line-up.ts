type OrdinalSuffix = 'st' | 'nd' | 'rd' | 'th'

function computeOrdinalNumber(number: number): OrdinalSuffix {
    const tensDigitEqualsOne = number % 100 > 9 && number % 100 < 20
    const onesDigit = number % 10

    switch (onesDigit) {
         case 1: return tensDigitEqualsOne ? 'th' : 'st'
         case 2: return tensDigitEqualsOne ? 'th' : 'nd'
         case 3: return tensDigitEqualsOne ? 'th' : 'rd'
        default: return 'th'
    }
}

export function format(name: string, number: number): string {
    if (number < 1 || number > 999) { throw new Error('Numbers can only be between 1 and 999.') }
    
    return `${name}, you are the ${number}${computeOrdinalNumber(number)} customer we serve today. Thank you!`
}
