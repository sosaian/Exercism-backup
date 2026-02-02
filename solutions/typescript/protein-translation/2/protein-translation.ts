const TRANSLATION_RESULT = {
    'AUG': 'Methionine',
    'UUU': 'Phenylalanine',
    'UUC': 'Phenylalanine',
    'UUA': 'Leucine',
    'UUG': 'Leucine',
    'UCU': 'Serine',
    'UCC': 'Serine',
    'UCA': 'Serine',
    'UCG': 'Serine',
    'UAU': 'Tyrosine',
    'UAC': 'Tyrosine',
    'UGU': 'Cysteine',
    'UGC': 'Cysteine',
    'UGG': 'Tryptophan',
    'UAA': 'STOP',
    'UAG': 'STOP',
    'UGA': 'STOP'
} as const

type CODON_SEQUENCE = keyof typeof TRANSLATION_RESULT

function isCodonSequence(value: unknown): value is CODON_SEQUENCE {
    return typeof value === 'string' && value in TRANSLATION_RESULT
}
    
export function translate(rna_sequence: string): string[] {
    const codon_sequence = rna_sequence.match(/.{1,3}/g) ?? [];
    const protein_list: string[] = []
    
    for (const codon of codon_sequence) {
        if (!isCodonSequence(codon)) throw new Error('Invalid codon')
        
        if (TRANSLATION_RESULT[codon] === 'STOP') break
        
        protein_list.push(TRANSLATION_RESULT[codon])
    }

    return protein_list
}
