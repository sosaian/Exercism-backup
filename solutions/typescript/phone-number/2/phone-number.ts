type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

function isDigit(char: unknown): char is Digit {
    return typeof char === 'string' && char >= '0' && char <= '9'
}

function toDigit(input: string): Digit[] {
    const VALID_CHARS = '+( )-.'
    const ENGLISH_LETTERS = 'abcdefghijklmnopqrstuvwxyz'
    
    const digits: Digit[] = []
    
    for (const char of input) {
        if (isDigit(char)) {
            digits.push(char)
            continue
        }
        if (VALID_CHARS.includes(char)) continue
        if (ENGLISH_LETTERS.includes(char.toLowerCase())) { 
            throw new Error('Letters not permitted')
        }
        throw new Error('Punctuations not permitted')
    }
    
    return digits
}

function toNanpNumber(input: Digit[]): string {
    const inputLength = input.length
    if (inputLength < 10) { throw new Error('Must not be fewer than 10 digits') }
    if (inputLength > 11) { throw new Error('Must not be greater than 11 digits') }
    
    if (inputLength === 11) { 
        if (input[0] !== '1') { throw new Error('11 digits must start with 1') }
        input.splice(0,1)
    }

    if (input[0] === '0') { throw new Error('Area code cannot start with zero') }
    if (input[0] === '1') { throw new Error('Area code cannot start with one') }
    if (input[3] === '0') { throw new Error('Exchange code cannot start with zero') }
    if (input[3] === '1') { throw new Error('Exchange code cannot start with one') }
    
    return input.join('')
}

export function clean(input: string): string { return toNanpNumber(toDigit(input)) }
