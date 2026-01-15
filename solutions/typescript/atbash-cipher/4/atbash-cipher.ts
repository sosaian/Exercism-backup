/**
 * Digits allowed by the Atbash cipher.
 * `as const` freezes both the values and their literal types,
 * allowing me to later derive a union type ('0' | '1' | ... | '9').
 */
const DIGITS = ['0','1','2','3','4','5','6','7','8','9'] as const
type Digit = typeof DIGITS[number]

/**
 * Latin alphabet supported by the cipher.
 * Again, `as const` lets TypeScript treat each letter as a literal.
 */
const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] as const
type Letter = typeof LETTERS[number]

/**
 * The complete set of characters that the cipher is allowed to process.
 * Any other character (spaces, punctuation, symbols) is intentionally ignored.
 */
type ValidChar = Digit | Letter

/**
 * The cipher mapping is built incrementally.
 * 
 * This starts as a Partial<Record<...>> because the object is empty at first.
 * After this it is proven (by construction) that all ValidChar keys are populated.
 */
const atbashCipher: Partial<Record<ValidChar,ValidChar>> = {}

/** 
 * Digits map to themselves in Atbash.
 * This loop exhaustively populates all Digit keys.
 */
for (const digit of DIGITS) { atbashCipher[digit] = digit }

/**
 * Letters are mapped symmetrically:
 * 'a' <-> 'z', 'b' <-> 'y', etc.
 * 
 * The mapping is derived deterministically from LETTERS,
 * avoiding hardcoded or duplicated values.
 */
for (let index = 0; index < LETTERS.length; index++) { 
    atbashCipher[LETTERS[index]] = LETTERS[LETTERS.length - 1 - index]
}

/**
 * At this point, the mapping is complete:
 * every Digit and every Letter has been assigned exactly once.
 * 
 * This is asserted to TypeScript by casting to Record<ValidChar, ValidChar>.
 * This is safe because the construction above is exhaustive and deterministic.
 */
const ATBASH_CIPHER = atbashCipher as Record<ValidChar,ValidChar>

/**
 * Runtime type guard that bridges JavaScript values to TypeScript types.
 * 
 * If this function returns true, TypeScript knows that `value`
 * is a ValidChar and can be safely used as a key into ATBASH_CIPHER. 
 */
function isValidChar(value: string): value is ValidChar { return value in ATBASH_CIPHER }

/**
 * Core transformation function for the Atbash cipher.
 * 
 * this function is used for both encoding and decoding because
 * Atbash is involutive: applying the cipher twice yields the original text.
 * 
 * The `toDecode` flag controls formatting only.
 */
export function encode(plainText: string, toDecode: boolean = false): string {
    let cipherText = ''

    for (const char of plainText) {  
        const lowerCaseChar = char.toLowerCase()

        // Only valid characters are transformed;
        // everything else (spaces, punctuation) is ignored.
        if (isValidChar(lowerCaseChar)) { cipherText += ATBASH_CIPHER[lowerCaseChar] }
    }

    /**
     * Encoding groups output in blocks of 5 characters,
     * while decoding returns the raw transformed string.
     * 
     * This formatting difference is the only asymmetry between
     * encoding and decoding.
     */
    return toDecode ? cipherText : cipherText.replace(/(.{5})/g, '$1 ').trim()
}

/**
 * Decoding reuses the same transformation logic.
 * 
 * This is not a code smell:
 * Atbash encryption is symmetric by definition,
 * so encoding and decoding are the same operation
 * with different output formatting.
 */
export function decode(cipherText: string): string { return encode(cipherText, true) }
