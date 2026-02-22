const ALLERGENS = [
    'eggs',
    'peanuts',
    'shellfish',
    'strawberries',
    'tomatoes',
    'chocolate',
    'pollen',
    'cats'
] as const

const AllergenSet = new Set<string>(ALLERGENS)

type Allergen = typeof ALLERGENS[number]

function isAllergen(input: unknown): input is Allergen { 
    return typeof input === 'string' && AllergenSet.has(input)
}

const ALLERGIES_SCORES: Record<Allergen,number> = {
    eggs: 1,
    peanuts: 2,
    shellfish: 4,
    strawberries: 8,
    tomatoes: 16,
    chocolate: 32,
    pollen: 64,
    cats: 128
}

const AllergiesKeys = Object.keys(ALLERGIES_SCORES)
const AllergiesValues = Object.values(ALLERGIES_SCORES)

export class Allergies {
    readonly #allergenIndex: number
    readonly #allergies: string[]

    #computeAllergies(allergenIndex: number): string[] {
        const potentialAllergies: string[] = []
        
        const normalizedAllergenIndex = allergenIndex & 255
        let currentAllergenIndex = normalizedAllergenIndex
        
        for (let i = AllergiesValues.length - 1; i > -1; i--) {
            if (currentAllergenIndex >= AllergiesValues[i]) {
                currentAllergenIndex -= AllergiesValues[i]
                potentialAllergies.unshift(AllergiesKeys[i])
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

    public list(): string[] { return [...this.#allergies] }

    public allergicTo(allergen: unknown): boolean {
        return isAllergen(allergen) && this.#allergies.includes(allergen)
    }
}
