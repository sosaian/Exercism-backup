export function parse(phrase: string): string {
    const words: string[] = phrase.split(/[-\s]+/)
    const acronym: string[] = []
    for (const word of words) { 
        if (word.length === 0) continue
        acronym.push(word[0].toUpperCase())
        const upperCaseLetters = word.slice(1).match(/([A-Z])/g)
        if (upperCaseLetters !== null) {
            for (const letter of upperCaseLetters) { acronym.push(letter) }
        }
        if (word[word.length - 1] === ":") break
    }
    return acronym.join('')
}
