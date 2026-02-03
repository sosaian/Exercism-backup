const CONFIGURATION_MAP = {
    3: "Pling",
    5: "Plang",
    7: "Plong"
} as const

export function convert(num: number): string {
    const raindropText = []

    for (const [key, value] of Object.entries(CONFIGURATION_MAP)) { 
        if (num % Number(key) === 0) raindropText.push(value)
    }

    return raindropText.length === 0 ? num.toString() : raindropText.join("")
}
