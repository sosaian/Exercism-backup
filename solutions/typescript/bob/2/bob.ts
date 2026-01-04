export function hey(message: string): string {
    const trimmedMessage = message.trim()
    
    if (trimmedMessage.length === 0) { return "Fine. Be that way!" } // Only contains whitespace characters

    const isQuestion = trimmedMessage.endsWith("?")

    const isYelling = 
        trimmedMessage === trimmedMessage.toUpperCase() && // Has no lower case letters
        trimmedMessage !== trimmedMessage.toLowerCase()    // Has upper case letters

    if (isQuestion && isYelling) { return "Calm down, I know what I'm doing!" }
    
    if (isQuestion) { return "Sure." }
    
    if (isYelling) { return "Whoa, chill out!" }

    return "Whatever."
}
