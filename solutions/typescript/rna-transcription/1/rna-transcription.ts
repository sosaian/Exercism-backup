export function toRna(dnaSequence: string): string {
    let rnaSequence: string[] = []

    for (const nucleotide of dnaSequence) {
        switch (nucleotide) {
            case "A":
                rnaSequence.push("U") 
                break
            case "C":
                rnaSequence.push("G")
                break
            case "G":
                rnaSequence.push("C")
                break
            case "T":
                rnaSequence.push("A")
                break
            default:
                throw new Error("Invalid input DNA.")
        }        
    }

    return rnaSequence.join('')
}
