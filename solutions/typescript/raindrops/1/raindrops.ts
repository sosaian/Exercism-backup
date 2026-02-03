export function convert(num: number): string {
    let raindropText = ""

    if (num % 3 === 0) raindropText += "Pling"
    if (num % 5 === 0) raindropText += "Plang"
    if (num % 7 === 0) raindropText += "Plong"
    
    return raindropText === "" ? String(num) : raindropText
}
