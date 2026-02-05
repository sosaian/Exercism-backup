const ERROR_INVALID_NUCLEOTIDE_MESSAGE = 'Invalid nucleotide in strand'

const NUCLEOTIDES = ['A', 'C', 'G', 'T'] as const
type NUCLEOTIDE = typeof NUCLEOTIDES[number]

const dnaNucleotides: Partial<Record<NUCLEOTIDE, number>> = {}

for (const nucleotide of NUCLEOTIDES) { dnaNucleotides[nucleotide] = 0 }

const DNA_NUCLEOTIDES = dnaNucleotides as Record<NUCLEOTIDE, number>

function isNucleotide(value: string): value is NUCLEOTIDE { return value in DNA_NUCLEOTIDES }

export function nucleotideCounts(nucleotideStrand: string): Record<NUCLEOTIDE,number> {
    const nucleotideCount: Record<NUCLEOTIDE, number> = JSON.parse(JSON.stringify(DNA_NUCLEOTIDES))

    for (const char of nucleotideStrand) {
        if (!isNucleotide(char)) throw new Error(ERROR_INVALID_NUCLEOTIDE_MESSAGE)
        
        nucleotideCount[char]++
    }

    return nucleotideCount 
}
