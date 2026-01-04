const ALPHABET_REGEX = /[a-z]/

export function isPangram(string : string) : boolean {
    const charsInString = new Set()
    
    if (string.length < 1) { return false }

    for (const char of string) { 
        if (ALPHABET_REGEX.test(char.toLowerCase())) {
            charsInString.add(char.toLowerCase())
        }
    }

    return charsInString.size === 26
}
