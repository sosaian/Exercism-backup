const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] as const
type Letter = typeof LETTERS[number]
function isLetter(value: string): value is Letter { 
    return (LETTERS as readonly string[]).includes(value)
}

const SCRABBLE_SCORES: Record<Letter,number> = {
    'A': 1,'E': 1,'I': 1,'O': 1,'U': 1,'L': 1,'N': 1,'R': 1,'S': 1,'T': 1,
    'D': 2,'G': 2,
    'B': 3,'C': 3,'M': 3,'P': 3,
    'F': 4,'H': 4,'V': 4,'W': 4,'Y': 4,
    'K': 5,
    'J': 8,'X': 8,
    'Q': 10,'Z': 10
} as const

export function score(word: unknown) {
    if (typeof word !== 'string') return 0
    
    return word
        .trim()
        .toUpperCase()
        .split('')
        .reduce((total: number, char: string) => total += isLetter(char) ? SCRABBLE_SCORES[char] : 0, 0)
}
