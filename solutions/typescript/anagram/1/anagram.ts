export class Anagram {
    readonly #anagram: string
    readonly #anagramSignature: string
    
    constructor(input: string) {
        if(input.trim().length < 1) throw new Error('Invalid anagram. Must be a word.')
        this.#anagram = input.trim().toUpperCase()
        this.#anagramSignature = this.#anagram.split('').sort().join('')
    }

    public matches(...potentials: string[]): string[] {
        const anagramMatches: string[] = []

        for (const potential of potentials) {
            if (potential.trim().length !== this.#anagramSignature.length) continue
            
            const normalizedPotential = potential.trim().toUpperCase()
            if (normalizedPotential === this.#anagram) continue
            
            const normalizedPotentialSignature = normalizedPotential.split('').sort().join('')
            if (normalizedPotentialSignature === this.#anagramSignature) anagramMatches.push(potential)
        }

        return anagramMatches
    }
}
 