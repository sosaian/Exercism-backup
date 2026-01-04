export function isPangram(string : string) : boolean {
    const charsInString = string.toLowerCase().match(/[a-z]/g) || []
    return new Set<string>(charsInString).size === 26
}
