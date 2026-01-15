const NUMBERS = ['0','1','2','3','4','5','6','7','8','9']
const PLAIN = 'abcdefghijklmnopqrstuvwxyz'
const CIPHER = 'zyxwvutsrqponmlkjihgfedcba'

export function encode(plainText: string): string {
    let cipherText = ''
    let charCount = 1

    for (const char of plainText) {  
        if (NUMBERS.includes(char)) { 
            cipherText += char
            if (charCount === 5) { 
                cipherText += " "
                charCount = 1
            } else { charCount ++ }
        } else if (PLAIN.includes(char.toLowerCase())) { 
            cipherText += CIPHER[PLAIN.indexOf(char.toLowerCase())]
            if (charCount === 5) { 
                cipherText += " "
                charCount = 1
            } else { charCount ++ }
        } else continue
    }
    return cipherText.trim()
}

export function decode(cipherText: string): string {
    let decodedText = ''
    for (const char of cipherText) {
        if (NUMBERS.includes(char)) { 
            decodedText += char
        } else if (PLAIN.includes(char)) { 
            decodedText += PLAIN[CIPHER.indexOf(char)]
        } else continue
    }
    return decodedText
}
