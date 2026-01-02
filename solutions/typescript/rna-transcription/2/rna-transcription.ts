const DNA_TO_RNA_MAPPING: Record<string, string> = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U',
}

export function toRna(dnaSequence: string): string {
    return dnaSequence
        .split('')
        .map((nucleotide) => {
            const complement = DNA_TO_RNA_MAPPING[nucleotide]

            if (!complement) throw new Error("Invalid input DNA.")
            
            return complement
        })
        .join('')
}
