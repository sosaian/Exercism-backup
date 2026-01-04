export function isPangram(string : string) : boolean {
    const ALPHABET = new Map()
    ALPHABET.set('a',0)
    ALPHABET.set('b',0)
    ALPHABET.set('c',0)
    ALPHABET.set('d',0)
    ALPHABET.set('e',0)
    ALPHABET.set('f',0)
    ALPHABET.set('g',0)
    ALPHABET.set('h',0)
    ALPHABET.set('i',0)
    ALPHABET.set('j',0)
    ALPHABET.set('k',0)
    ALPHABET.set('l',0)
    ALPHABET.set('m',0)
    ALPHABET.set('n',0)
    ALPHABET.set('o',0)
    ALPHABET.set('p',0)
    ALPHABET.set('q',0)
    ALPHABET.set('r',0)
    ALPHABET.set('s',0)
    ALPHABET.set('t',0)
    ALPHABET.set('u',0)
    ALPHABET.set('v',0)
    ALPHABET.set('w',0)
    ALPHABET.set('x',0)
    ALPHABET.set('y',0)
    ALPHABET.set('z',0)
    
    if (string.length < 1) { return false }

    let currentCharCount

    for (const char of string) {
        currentCharCount = ALPHABET.get(char.toLowerCase())
        
        if (currentCharCount !== undefined) { ALPHABET.set(char.toLowerCase(), ++currentCharCount) }
    }

    for (const value of ALPHABET.values()) { if (value === 0) { return false } }

    return true
}
