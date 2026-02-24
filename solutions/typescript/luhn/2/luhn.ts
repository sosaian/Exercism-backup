export function valid(digitString: string): boolean {
    const digitStringLength = digitString.length
    let digitPositionFromRight = 0
    let digitSum = 0

    for (let i = digitStringLength - 1; i > -1; i--) {
        const char = digitString[i]
        
        if (char === ' ') { continue }
        if (char < '0' || char > '9') { return false }
        
        const digit = Number(char)

        if (digitPositionFromRight % 2 === 0) { digitSum += digit }
        else { digitSum += digit * 2 > 9 ? digit * 2 - 9 : digit * 2 }

        digitPositionFromRight++
    }

    if (digitPositionFromRight < 2) return false
    
    return digitSum % 10 === 0
}
