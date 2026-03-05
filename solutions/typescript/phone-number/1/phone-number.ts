const VALID_CHARS = '+( )-.' as const
const ENGLISH_LETTERS = 'abcdefghijklmnopqrstuvwxyz' as const

export function clean(input: string): string {
    if (input.length < 10) throw new Error('Must not be fewer than 10 digits')
    
    const parsedInput: string[] = []
    for (const char of input) {
        if (char >= '0' && char <= '9') {
            parsedInput.push(char)
        } else {
            const isLetter = ENGLISH_LETTERS.includes(char.toLowerCase())
            if (isLetter) throw new Error('Letters not permitted')
            const isValidPunctuation = VALID_CHARS.includes(char)
            if (!isValidPunctuation) throw new Error('Punctuations not permitted')
        }
    }
    
    const parsedInputLength = parsedInput.length
    
    if (parsedInputLength < 10) throw new Error('Must not be fewer than 10 digits')
    if (parsedInputLength > 11) throw new Error('Must not be greater than 11 digits')
    
    
    if (parsedInputLength === 11) { 
        if (parsedInput[0] !== '1') throw new Error('11 digits must start with 1')
        parsedInput.splice(0,1)
    }

    if (parsedInput[0] === '0') throw new Error('Area code cannot start with zero')
    if (parsedInput[0] === '1') throw new Error('Area code cannot start with one')
    if (parsedInput[3] === '0') throw new Error('Exchange code cannot start with zero')
    if (parsedInput[3] === '1') throw new Error('Exchange code cannot start with one')
    
    return parsedInput.join('')
}
