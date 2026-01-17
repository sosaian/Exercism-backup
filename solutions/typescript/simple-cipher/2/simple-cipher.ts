const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] as const
const LETTERS_LENGTH = LETTERS.length

type Letter = typeof LETTERS[number]

function isLetter(value: string): value is Letter { 
    return (LETTERS as readonly string[]).includes(value)
}

const KEY_LENGTH = 100

const ERROR_INVALID_KEY_MESSAGE = 'Key must be composed only of lowercase letters.'

export class SimpleCipher {    
    readonly key: string

    private generateKey(): string {
        let randomKey = ""

        for (let index = 0; index < KEY_LENGTH; index++) {
            randomKey += LETTERS[Math.floor(Math.random() * LETTERS_LENGTH)]
        }
        
        return randomKey
    }

    constructor(givenKey: string = "") { 
        if (givenKey === "") {
            this.key = this.generateKey()
            return
        }

        for (const char of givenKey) {
            if (!isLetter(char)) { throw new Error(ERROR_INVALID_KEY_MESSAGE) }
        }

        this.key = givenKey
    }

    encode(inputText: string): string {
        let normalizedInputText = inputText.trim().toLowerCase()
        let encodedText = ""
        let encodedCharCount = 0

        for (let i = 0; i < normalizedInputText.length; i++) {
            encodedCharCount++
            const currentChar = normalizedInputText[i]

            if (!isLetter(currentChar)) { continue }

            
            const inputIndex = LETTERS.indexOf(currentChar)
            
            const currentKeyIndex = encodedCharCount % this.key.length
            const keyChar = this.key[currentKeyIndex] as Letter
            
            const shiftAmount = LETTERS.indexOf(keyChar)
            
            const cipherCharIndex = (inputIndex + shiftAmount) % LETTERS_LENGTH
            
            encodedText += LETTERS[cipherCharIndex]
        }

        return encodedText
    }

    decode(inputText: string): string {
        let normalizedInputText = inputText.trim().toLowerCase()
        let decodedText = ""

        for (let i = 0; i < normalizedInputText.length; i++) {
            const currentChar = normalizedInputText[i]

            if (!isLetter(currentChar)) { continue }

            const inputIndex = LETTERS.indexOf(currentChar)

            const currentKeyIndex = i % this.key.length
            const keyChar = this.key[currentKeyIndex] as Letter

            const shiftAmount = LETTERS.indexOf(keyChar)

            const cipherCharIndex = (inputIndex - shiftAmount + LETTERS_LENGTH) % LETTERS_LENGTH

            decodedText += LETTERS[cipherCharIndex]
        }

        return decodedText
    }
}
