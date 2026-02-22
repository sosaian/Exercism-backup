/**
 * Ordered list defines the bit position for each allergen.
 * 
 * The index in this tuple is the canonical source of truth for bit mapping.
 */
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

/**
 * Literal union derived from the tuple so the type stays automatically synchronized
 * with ALLERGENS.
 */
type Allergen = typeof ALLERGENS[number]

/**
 * Used by the type guard for fast membership checks at runtime.
 * 
 * Typed as string (not Allergen) so `.has()` accepts a narrowed string before the
 * predicate refines it to Allergen.
 */
const AllergenSet: ReadonlySet<string> = new Set(ALLERGENS)

// Safely validates untrusted external input agains our known domain.
function isAllergen(input: unknown): input is Allergen { 
    return typeof input === 'string' && AllergenSet.has(input)
}

export class Allergies {
    /**
     * Internal representation uses a bitmask.
     * 
     * Each bit corresponds to the allergen at the same index in ALLERGENS.
     */
    readonly #allergenScore: number
    
    constructor(allergenIndex: number) {
        // Enforce domain constraints explicitly rather than silently coercing.
        if (!Number.isInteger(allergenIndex) || allergenIndex < 0)
            throw new Error('AllergenIndex must be a positive integer')
        
        /**
         * Only the lowest 8 bits are meaningful (one per allergen).
         * 
         * Masking prevents higher bits from affecting behavior.
         */
        this.#allergenScore = allergenIndex & 255
    }

    public list(): Allergen[] {
        return ALLERGENS.filter((_, index) => 
            (this.#allergenScore & (1 << index)) !== 0
        )
    }

    public allergicTo(allergen: unknown): boolean {
        return (
            isAllergen(allergen) &&
            (this.#allergenScore & (1 << ALLERGENS.indexOf(allergen))) !== 0
        )
    }
}
