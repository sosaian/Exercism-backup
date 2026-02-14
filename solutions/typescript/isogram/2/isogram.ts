export function isIsogram(text: string): boolean {
    const lettersInText: Set<string> = new Set()

    for (const char of text) {
        const normalizedChar = char.toLowerCase()
        const normalizedCharCode = normalizedChar.charCodeAt(0)

        const isLetter = normalizedCharCode >= 'a'.charCodeAt(0)
            && normalizedCharCode <= 'z'.charCodeAt(0)

        if (!isLetter) continue
    
        if (lettersInText.has(normalizedChar)) return false
    
        lettersInText.add(normalizedChar)
    }
    
    return true
}
