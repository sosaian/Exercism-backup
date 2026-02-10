export function parse(phrase: string): string {
    const explicit = phrase.match(/^([A-Z]+):/)
    if (explicit) return explicit[1]

    const words: string[] = phrase.split(/[-\s:]+/)
    const acronym: string[] = []
    for (const word of words) { 
        if (word.length === 0) continue
        
        if (word === word.toUpperCase()) acronym.push(word)
        else {
            acronym.push(word[0].toUpperCase())
            
            const upperCaseLetters = word.slice(1).match(/([A-Z])/g)
            
            if (upperCaseLetters !== null) {
                for (const letter of upperCaseLetters) { acronym.push(letter) }
            }
        }
    }
    return acronym.join('')
}
