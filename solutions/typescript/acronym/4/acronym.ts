export function parse(phrase: string): string {
    return phrase
        .replace(/([a-z])([A-Z])/g,'$1 $2') // Insert word boundary between lowerCase and UpperCase letters
        .split(/[\s-]+/)                    // Break into array
        .filter(Boolean)                    // Filter out empty tokens
        .map(word => word[0].toUpperCase()) // Transform to first letter
        .join('')                           // Back to string
}
