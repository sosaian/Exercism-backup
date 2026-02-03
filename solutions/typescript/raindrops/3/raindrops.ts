const RULES = [
    {factor: 3, sound: "Pling"},
    {factor: 5, sound: "Plang"},
    {factor: 7, sound: "Plong"}
] as const

export function convert(num: number): string {
    const raindropText: string[] = []

    for (const rule of RULES) { if (num % rule.factor === 0) raindropText.push(rule.sound) }

    return raindropText.length === 0 ? num.toString() : raindropText.join("")
}
