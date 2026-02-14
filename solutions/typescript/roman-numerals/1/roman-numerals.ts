const ROMAN_PAIRS = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
] as const

export const toRoman = (decimal: number): string => {
    if (!Number.isInteger(decimal))
        throw new Error('Only integer arabic numbers supported!')
    if (decimal < 1 || decimal > 3999) throw new Error('Unsupported arabic number!')
    let arabic = decimal
    let roman = ''

    for (const [value, symbol] of ROMAN_PAIRS) {
        while (arabic >= value) {
            roman += symbol
            arabic -= value
        }
    }

    return roman
}
