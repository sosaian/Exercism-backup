export class Anagram {
    readonly #anagram: string
    readonly #anagramSignature: string
    
    constructor(input: string) {
        if(input.trim().length < 1) throw new Error('Invalid anagram. Must be a word.')
        this.#anagram = input.trim().toUpperCase()
        this.#anagramSignature = Anagram.#computeAnagramSignature(this.#anagram)
    }

    static #computeAnagramSignature(input: string): string { return input.split('').sort().join('') }

    public matches(...potentials: readonly string[]): string[] {
        return potentials.filter(potential => {
            const normalizedPotential = potential.trim().toUpperCase()
            
            if (normalizedPotential.length !== this.#anagram.length) return false
            
            if (normalizedPotential === this.#anagram) return false
            
            return Anagram.#computeAnagramSignature(normalizedPotential) === this.#anagramSignature
        })
    }
}
 