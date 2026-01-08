const HANDSHAKE_COMMANDS = {
    1: 'wink',
    2: 'double blink',
    4: 'close your eyes',
    8: 'jump',
} as const

export function commands( handshakeNumber: number ): string[] {
    if ( handshakeNumber < 1 || handshakeNumber > 31 ) { return [] }

    let handshakeCommands: string[] = []

    if ( ( handshakeNumber & 1 ) !== 0 ) { handshakeCommands.push( HANDSHAKE_COMMANDS[1] ) }
    
    if ( ( handshakeNumber & 2 ) !== 0 ) { handshakeCommands.push( HANDSHAKE_COMMANDS[2] ) }
    
    if ( ( handshakeNumber & 4 ) !== 0 ) { handshakeCommands.push( HANDSHAKE_COMMANDS[4] ) }
    
    if ( ( handshakeNumber & 8 ) !== 0 ) { handshakeCommands.push( HANDSHAKE_COMMANDS[8] ) }
    
    if ( ( handshakeNumber & 16 ) !== 0 ) { handshakeCommands.reverse() }

    return handshakeCommands
}
