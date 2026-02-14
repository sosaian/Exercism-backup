const LETTERS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'] as const
type Letter = typeof LETTERS[number]

function isLetter(char: string): char is Letter {
    if (char.length !== 1) return false
    
    return (LETTERS as readonly string[]).includes(char)
}

export function isIsogram(text: string): boolean {
    const trimmedText = text.trim()
    
    if (trimmedText.length < 1) return true // Edge case
    
    const letterSet: Set<Letter> = new Set()
    
    for (const char of trimmedText) {
        const normalizedChar = char.toLowerCase()
    
        if (!isLetter(normalizedChar)) continue
    
        if (letterSet.has(normalizedChar)) return false
    
        letterSet.add(normalizedChar)
    }
    
    return true
}
