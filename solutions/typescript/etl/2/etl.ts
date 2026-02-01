type ETLLettersByPoints = { [key: string]: string[] }
type ETLPointsByLetter = { [key: string]: number }

export function transform(values: ETLLettersByPoints): ETLPointsByLetter {
    const flatValues: ETLPointsByLetter = {}
    
    for (const [points, letters] of Object.entries(values)) {
        for (const letter of letters) {
            flatValues[letter.toLowerCase()] = Number(points)
        }
    }
    
    return flatValues
}
