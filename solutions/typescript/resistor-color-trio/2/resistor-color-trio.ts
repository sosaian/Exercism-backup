export const COLORS = ['black',
    'brown',
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'grey',
    'white',] as const

type Color = typeof COLORS[number];

export function decodedResistorValue(colors: Color[]): string {
    let digitOne = COLORS.indexOf(colors[0])
    let digitTwo = COLORS.indexOf(colors[1])
    let digitThree = COLORS.indexOf(colors[2])

    let totalOhms = (digitOne * 10 + digitTwo) * Math.pow(10, digitThree)

    // Design Choice: Only convert to larger units (kilo/mega/giga) if the value
    // is an EXACT multiple of that unit. We strictly avoid returning decimals
    // (e.g., return "1200 ohms", not "1.2 kiloohms").
    if (totalOhms === 0)
        return "0 ohms"
    else if (totalOhms % 1_000_000_000 === 0)
        return `${totalOhms / 1_000_000_000} gigaohms`
    else if (totalOhms % 1_000_000 === 0)
        return `${totalOhms / 1_000_000} megaohms`
    else if (totalOhms % 1000 === 0)
        return `${totalOhms / 1000} kiloohms`
    else return `${totalOhms} ohms`
}