const ALLERGIES_SCORES: Record<string,number> = {
    eggs: 1,
    peanuts: 2,
    shellfish: 4,
    strawberries: 8,
    tomatoes: 16,
    chocolate: 32,
    pollen: 64,
    cats: 128
}

/**
 * eggs (1)
peanuts (2)
shellfish (4)
strawberries (8)
tomatoes (16)
chocolate (32)
pollen (64)
cats (128)
 */

export class Allergies {
    #allergenIndex: number
    #allergies: string[]

    #computeAllergies(allergenIndex: number): string[] {
        const potentialAllergies: string[] = []
        
        const keys = Object.keys(ALLERGIES_SCORES)
        const values = Object.values(ALLERGIES_SCORES)
        const maxAllergenIndex = values.reduce((acc,act) => acc + act, 0) + 1
        
        const normalizedAllergenIndex = allergenIndex % maxAllergenIndex
        let currentAllergenIndex = normalizedAllergenIndex
        
        for (let i = values.length - 1; i > -1; i--) {
            if (currentAllergenIndex >= values[i]) {
                currentAllergenIndex -= values[i]
                potentialAllergies.unshift(keys[i])
            }
        }
        
        return potentialAllergies
    }
    
    constructor(allergenIndex: number) {
        if (allergenIndex < 0) throw new Error('AllergenIndex must be positive')
        if (!Number.isInteger(allergenIndex))
            throw new Error('AllergenIndex must be an integer number')
        this.#allergenIndex = allergenIndex
        this.#allergies = this.#computeAllergies(this.#allergenIndex)
    }

    public list(): unknown { return this.#allergies }

    public allergicTo(allergen: string): boolean {
        return this.#allergies.includes(allergen)
    }
}
