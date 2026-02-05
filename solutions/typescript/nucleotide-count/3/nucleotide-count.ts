const ERROR_INVALID_NUCLEOTIDE_MESSAGE = 'Invalid nucleotide in strand'

type NUCLEOTIDE = 'A' | 'C' | 'G' | 'T'

function isNucleotide(value: string): value is NUCLEOTIDE {
    return value === 'A' || value === 'C' || value === 'G' || value === 'T'
}

export function nucleotideCounts(nucleotideStrand: string): Record<NUCLEOTIDE,number> {
    const nucleotideCount: Record<NUCLEOTIDE,number> = { A: 0, C: 0, G: 0, T: 0, }

    for (const char of nucleotideStrand) {
        if (!isNucleotide(char)) throw new Error(ERROR_INVALID_NUCLEOTIDE_MESSAGE)
        
        nucleotideCount[char]++
    }

    return nucleotideCount 
}
