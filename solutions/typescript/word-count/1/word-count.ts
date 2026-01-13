export function count(inputText: string): Map<string, number> {
    let wordCounter = new Map<string, number>()

    let splittedText = inputText.split(/[\s\t\n\r,.?!"`:&@$%^]/)

    for (let word of splittedText) {
        word = word.toLocaleLowerCase()
        
        wordCounter.set(
            word,
            wordCounter.get(word) === undefined ? 1 : wordCounter.get(word)! + 1
        )
    }

    return wordCounter

    // throw new Error('Remove this line and implement the function')
}
