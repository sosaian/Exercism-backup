export function count(inputText: string): Map<string, number> {
    let wordCounter = new Map<string, number>()

    let wordsInText = inputText.match(/[A-Za-z]+('[A-Za-z]+)*|[0-9]+/g)

    if (wordsInText === null) { return wordCounter }

    for (let word of wordsInText) {
        word = word.toLocaleLowerCase()
        
        wordCounter.set(
            word,
            wordCounter.get(word) === undefined ? 1 : wordCounter.get(word)! + 1
        )
    }

    return wordCounter
}
