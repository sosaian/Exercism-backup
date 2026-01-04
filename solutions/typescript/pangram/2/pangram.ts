export function isPangram(string : string) : boolean {
    const charsInString = new Set()
    
    if (string.length < 1) { return false }

    for (const char of string) {
        charsInString.add(char.toLowerCase())
    }

    return charsInString.size === 26
}
