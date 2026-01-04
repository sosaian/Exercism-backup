export function hey(message: string): string {
    const hasOnlyVariousWhitespaceCharacters = new Set(message.match(/[^\s\t\n\r]/)).size === 0
    
    if (message.length === 0 || hasOnlyVariousWhitespaceCharacters) { return "Fine. Be that way!" }

    const endsInQuestionMark = message.trim().charAt(message.trim().length - 1) === "?"
    const hasNoLowerCaseLetters = new Set(message.match(/[a-z]/g) || []).size === 0
    const hasUpperCaseLetters = new Set(message.match(/[A-Z]/g) || []).size !== 0

    if (endsInQuestionMark && (hasNoLowerCaseLetters && hasUpperCaseLetters)) {
        return "Calm down, I know what I'm doing!"
    } else if (endsInQuestionMark) {
        return "Sure."
    } else if (hasNoLowerCaseLetters && hasUpperCaseLetters) {
        return "Whoa, chill out!"
    }

    return "Whatever."
}
