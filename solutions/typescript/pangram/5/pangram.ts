const ALPHABET_REGEX = /[a-z]/

export function isPangram(string : string) : boolean {
    const lowerCaseString = string.toLowerCase()
    
    const charsInString = new Set<string>()

    for (const char of lowerCaseString) { 
        if (ALPHABET_REGEX.test(char)) {
            charsInString.add(char)
        }
    }

    return charsInString.size === 26
}
