function computeOrdinalNumber(number: number): string {
    const numberToString = String(number)
    if (numberToString[numberToString.length - 2] === '1') { return `${number}th` }

    switch (numberToString[numberToString.length - 1]) {
        case "1":
            return `${number}st`
        case "2":
            return `${number}nd`
        case "3":
            return `${number}rd`
        default:
            return `${number}th`
    }
}

export function format(name: string, number: number): string {
    if (number < 1 || number > 999) {}
    const ordinalNumber: string = computeOrdinalNumber(number)
    
    return `${name}, you are the ${ordinalNumber} customer we serve today. Thank you!`
}
