export function parse(phrase: string): string {
    return phrase
        .replace(/([a-z])([A-Z])/g,'$1 $2') // Handle CamelCase or punctuation
        .split(/[\s-]+/)                    // Break into array
        .map(word => word[0].toUpperCase()) // Transform to first letter
        .join('')                           // Back to string
}
