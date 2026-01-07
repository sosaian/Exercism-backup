export function commands(handshakeNumber: number) : string[] {
    if (handshakeNumber < 1 || handshakeNumber > 31) { return [] }
    
    let handshakeNumberToBinary : string = ""

    switch (handshakeNumber) {
        case 1:
            handshakeNumberToBinary = "00001"
            break
        case 2:
            handshakeNumberToBinary = "00010"
            break
        case 3:
            handshakeNumberToBinary = "00011"
            break
        case 4:
            handshakeNumberToBinary = "00100"
            break
        case 5:
            handshakeNumberToBinary = "00101"
            break
        case 6:
            handshakeNumberToBinary = "00110"
            break
        case 7:
            handshakeNumberToBinary = "00111"
            break
        case 8:
            handshakeNumberToBinary = "01000"
            break
        case 9:
            handshakeNumberToBinary = "01001"
            break
        case 10:
            handshakeNumberToBinary = "01010"
            break
        case 11:
            handshakeNumberToBinary = "01011"
            break
        case 12:
            handshakeNumberToBinary = "01100"
            break
        case 13:
            handshakeNumberToBinary = "01101"
            break
        case 14:
            handshakeNumberToBinary = "01110"
            break
        case 15:
            handshakeNumberToBinary = "01111"
            break
        case 16:
            handshakeNumberToBinary = "10000"
            break
        case 17:
            handshakeNumberToBinary = "10001"
            break
        case 18:
            handshakeNumberToBinary = "10010"
            break
        case 19:
            handshakeNumberToBinary = "10011"
            break
        case 20:
            handshakeNumberToBinary = "10100"
            break
        case 21:
            handshakeNumberToBinary = "10101"
            break
        case 22:
            handshakeNumberToBinary = "10110"
            break
        case 23:
            handshakeNumberToBinary = "10111"
            break
        case 24:
            handshakeNumberToBinary = "11000"
            break
        case 25:
            handshakeNumberToBinary = "11001"
            break
        case 26:
            handshakeNumberToBinary = "11010"
            break
        case 27:
            handshakeNumberToBinary = "11011"
            break
        case 28:
            handshakeNumberToBinary = "11100"
            break
        case 29:
            handshakeNumberToBinary = "11101"
            break
        case 30:
            handshakeNumberToBinary = "11110"
            break
        case 31:
            handshakeNumberToBinary = "11111"
            break
    }

    let handshakeCommands = []

    if (handshakeNumberToBinary.charAt(4) === "1") { handshakeCommands.push("wink")}
    
    if (handshakeNumberToBinary.charAt(3) === "1") { handshakeCommands.push("double blink")}
    
    if (handshakeNumberToBinary.charAt(2) === "1") { handshakeCommands.push("close your eyes")}
    
    if (handshakeNumberToBinary.charAt(1) === "1") { handshakeCommands.push("jump")}
    
    if (handshakeNumberToBinary.charAt(0) === "1") { handshakeCommands.reverse() }

    return handshakeCommands
}
