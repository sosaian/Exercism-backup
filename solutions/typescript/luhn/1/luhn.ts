type DigitChar = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

function isDigitChar(input: string): input is DigitChar {
    return input.charCodeAt(0) >= '0'.charCodeAt(0)
            && input.charCodeAt(0) <= '9'.charCodeAt(0)
}

export function valid(digitString: unknown): boolean {
    if (typeof digitString !== 'string') { return false }
    if (digitString.trim().length < 2) { return false }
    
    const parsedDigitString: DigitChar[] = []
    
    for (const char of digitString) {
        if (char === ' ') { continue }
        if (!isDigitChar(char)) { return false }
        parsedDigitString.push(char)
    }

    let digitSum = 0
    let isSecondDigit = false

    for (let i = parsedDigitString.length - 1; i > -1; i--) {
        if (!isSecondDigit) {
            digitSum += Number(parsedDigitString[i])
            isSecondDigit = !isSecondDigit
            continue
        }
        
        const doubleDigit = Number(parsedDigitString[i]) * 2
        digitSum += doubleDigit > 9 ? doubleDigit - 9 : doubleDigit
        isSecondDigit = !isSecondDigit
    }
    
    return digitSum % 10 === 0
}
