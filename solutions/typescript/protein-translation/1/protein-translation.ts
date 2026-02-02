type CODON_SEQUENCE = 'AUG' | 'UUU' | 'UUC' | 'UUA' | 'UUG' |
 'UCU' | 'UCC' | 'UCA' | 'UCG' | 'UAU' | 'UAC' | 'UGU' | 'UGC' |
 'UGG' | 'UAA' | 'UAG' | 'UGA'

 
 type AMINOACID = 'Methionine' | 'Phenylalanine' | 'Leucine' | 'Serine' |
 'Tyrosine' | 'Cysteine' | 'Tryptophan'
 
 type CODON_STOP_SIGNAL = 'UAA' | 'UAG' | 'UGA'
 
 const TRANSLATION_RESULT: Record<string, AMINOACID | 'STOP'> = {
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
}

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
