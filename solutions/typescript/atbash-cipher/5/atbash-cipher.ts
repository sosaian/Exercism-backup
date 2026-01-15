const DIGITS = ['0','1','2','3','4','5','6','7','8','9'] as const
type Digit = typeof DIGITS[number]

const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] as const
type Letter = typeof LETTERS[number]

type ValidChar = Digit | Letter

// Built deterministically so every ValidChar is populated exactly once.
const atbashCipher: Partial<Record<ValidChar,ValidChar>> = {}

for (const digit of DIGITS) { atbashCipher[digit] = digit }

for (let index = 0; index < LETTERS.length; index++) { 
    atbashCipher[LETTERS[index]] = LETTERS[LETTERS.length - 1 - index]
}

// Safe: construction above exhaustively covers ValidChar.
const ATBASH_CIPHER = atbashCipher as Record<ValidChar,ValidChar>

function isValidChar(value: string): value is ValidChar { return value in ATBASH_CIPHER }

export function encode(plainText: string, toDecode: boolean = false): string {
    let cipherText = ''

    for (const char of plainText) {  
        const lowerCaseChar = char.toLowerCase()

        if (isValidChar(lowerCaseChar)) { cipherText += ATBASH_CIPHER[lowerCaseChar] }
    }

    // Grouping applies only to encoding.
    return toDecode ? cipherText : cipherText.replace(/(.{5})/g, '$1 ').trim()
}

export function decode(cipherText: string): string { return encode(cipherText, true) }
