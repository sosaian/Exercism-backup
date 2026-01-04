const ALPHABET = new Set([
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
])

export function isPangram(string : string) : boolean {
    const charsInString = new Set()
    
    if (string.length < 1) { return false }

    for (const char of string) { 
        if (ALPHABET.has(char.toLowerCase())) {
            charsInString.add(char.toLowerCase())
        }
    }

    return charsInString.size === 26
}
