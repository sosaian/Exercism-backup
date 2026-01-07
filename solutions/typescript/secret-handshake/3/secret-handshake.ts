const HANDSHAKE_COMMANDS = new Map([
    [1, 'wink'],
    [2, 'double blink'],
    [4, 'close your eyes'],
    [8, 'jump'],
])

export function commands( handshakeNumber: number ): string[] {
    if ( handshakeNumber < 0 || handshakeNumber > 31 ) { return [] }

    let handshakeCommands: string[] = []

    for (const [binaryDigit, action] of HANDSHAKE_COMMANDS) {
        if ( ( handshakeNumber & binaryDigit ) !== 0 ) { handshakeCommands.push( action ) }
    }

    if ( ( handshakeNumber & 16 ) !== 0 ) { handshakeCommands.reverse() }
    
    return handshakeCommands
}
