export function transform(values: { [key: string]: string[] }): { [key: string]: number } {
    const flatValues: { [key: string]: number } = {}
    
    for (const [key, letters] of Object.entries(values)) {
        for (const letter of letters) {
            flatValues[letter.toLowerCase()] = Number(key)
        }
    }
    
    return flatValues
}
