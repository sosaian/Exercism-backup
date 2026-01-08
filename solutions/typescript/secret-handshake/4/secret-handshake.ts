// This exercise strictly allows numbers from 1 to 31 for handshake commands.
const UPPER_THRESHOLD = 31
const LOWER_THRESHOLD = 1

const HANDSHAKE_ACTIONS = [
    'wink',
    'double blink',
    'close your eyes',
    'jump',
] as const

type HandshakeAction = typeof HANDSHAKE_ACTIONS[number]

const HANDSHAKE_COMMANDS = [
    { binaryDigit: 1, action: HANDSHAKE_ACTIONS[0] },
    { binaryDigit: 2, action: HANDSHAKE_ACTIONS[1] },
    { binaryDigit: 4, action: HANDSHAKE_ACTIONS[2] },
    { binaryDigit: 8, action: HANDSHAKE_ACTIONS[3] },
] as const

const REVERSE_COMMAND_DIGIT = 16

export function commands( handshakeNumber: number ): HandshakeAction[] {
    if ( handshakeNumber < LOWER_THRESHOLD || handshakeNumber > UPPER_THRESHOLD ) { return [] }

    let handshakeCommands: HandshakeAction[] = []

    for (const command of HANDSHAKE_COMMANDS) {
        if ( ( handshakeNumber & command.binaryDigit ) !== 0 ) {
            handshakeCommands.push(command.action)
        }
    }

    if ( ( handshakeNumber & REVERSE_COMMAND_DIGIT ) !== 0 ) { handshakeCommands.reverse() }
    
    return handshakeCommands
}
