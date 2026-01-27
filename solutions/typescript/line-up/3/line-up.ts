function computeOrdinalNumber(number: number): string {
    const numberToString = String(number)
    const tenthsIsOne = numberToString[numberToString.length - 2] === '1'

    switch (numberToString[numberToString.length - 1]) {
        case "1":
            return `${number}${tenthsIsOne ? 'th' : 'st'}`
        case "2":
            return `${number}${tenthsIsOne ? 'th' : 'nd'}`
        case "3":
            return `${number}${tenthsIsOne ? 'th' : 'rd'}`
        default:
            return `${number}th`
    }
}

export function format(name: string, number: number): string {
    if (number < 1 || number > 999) { throw new Error('Numbers can only be between 1 and 999.')}
    
    return `${name}, you are the ${computeOrdinalNumber(number)} customer we serve today. Thank you!`
}
