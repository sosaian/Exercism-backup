export function decodedResistorValue(colors: string[]): string {
  let firstColor = COLORS.indexOf(colors[0])
  let secondColor = COLORS.indexOf(colors[1])
  let decodedColor = "0"

  if (firstColor === 0)
    if (secondColor === 0)
      decodedColor = "0"
    else
      decodedColor = `${secondColor}`
  else
    if (secondColor === 0)
      decodedColor = `${firstColor}`
    else
      decodedColor = `${firstColor}${secondColor}`
  
  switch (COLORS.indexOf(colors[2])) {
    case 0:
      return `${decodedColor} ohms`

    case 1:
      return `${decodedColor}0 ohms`
    
    case 2:
      return `${decodedColor} kiloohms`
    
    case 3:
      return `${decodedColor} kiloohms`
      
    case 4:
      return `${decodedColor}0 kiloohms`

    case 5:
      return `${decodedColor}00 kiloohms`

    case 6:
      return `${decodedColor} megaohms`

    case 7:
      return `${decodedColor}0 megaohms`

    case 8:
      return `${decodedColor}00 megaohms`

    case 9:
      return `${decodedColor} gigaohms`
      
    default:
      return `not a valid color pattern.`
  }
}

export const COLORS = ['black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',]