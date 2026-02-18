type Gamestate = 'ongoing' | 'draw' | 'win'
type Cell = 'X' | 'O' | ' '
type Line = [Cell, Cell, Cell]

function isCell(char: string): char is Cell {
    return char === 'X' || char === 'O' || char === ' '
}

const ERRORS = {
    boardSize: 'Invalid board: each board must contain exactly 3 rows',
    rowLength: 'Invalid board: each row must contain exactly 3 characters',
    badChar: 'Invalid board: only X, O and space are allowed',
    turnOrder: {
        negative: 'Wrong turn order: O started',
        tooManyX: 'Wrong turn order: X went twice',
    },
    impossible: 'Impossible board: game should have ended after the game was won'
} as const

export const gamestate = (board: string[]): Gamestate => {
    if (board.length !== 3) throw new Error(ERRORS.boardSize)
    
    let countX = 0
    let countO = 0
    const parsedBoard: Line[] = []
    
    for (const row of board) {
        if (row.length !== 3) throw new Error(ERRORS.rowLength)
        for (const char of row) {
            if (!isCell(char)) { throw new Error(ERRORS.badChar) }
            if (char === 'X') countX++
            else if (char === 'O') countO++
        }
        const parsedRow = [...row] as Cell[]
        parsedBoard.push(parsedRow as Line)
    }

    if (countX - countO < 0) throw new Error(ERRORS.turnOrder.negative)
    else if (countX - countO > 1) throw new Error(ERRORS.turnOrder.tooManyX)
    
    const getRow = (row: number): Line => [
        parsedBoard[row][0],
        parsedBoard[row][1],
        parsedBoard[row][2],
    ]

    const getCol = (col: number): Line => [
        parsedBoard[0][col],
        parsedBoard[1][col],
        parsedBoard[2][col],
    ]

    const diag1: Line = [parsedBoard[0][0],parsedBoard[1][1],parsedBoard[2][2]]
    const diag2: Line = [parsedBoard[0][2],parsedBoard[1][1],parsedBoard[2][0]]

    const lines: Line[] = [
        getRow(0), getRow(1), getRow(2),
        getCol(0), getCol(1), getCol(2),
        diag1, diag2
    ]

    const lineWinner = (line: Line): 'X' | 'O' | null => {
        if (line[0] !== ' ' && line[0] === line[1] && line[0] === line[2]) {
            return line[0]
        }
        return null
    }

    const winners = lines.map(lineWinner).filter(Boolean)
    if (winners.length > 0) {
        let hasXwon = false
        let hasOwon = false
        for (const winner of winners) {
            if (winner === null) continue
            if (winner === 'X') hasXwon = true
            else hasOwon = true
        }
        if (hasXwon && hasOwon) { throw new Error(ERRORS.impossible) }
        if (hasXwon && countX !== countO + 1) { throw new Error(ERRORS.impossible) }
        if (hasOwon && countX !== countO) { throw new Error(ERRORS.impossible) }
        return 'win'
    }

    for (const row of board) { 
        for (const char of row) { if (char === ' ') return 'ongoing' }
    }
    
    return 'draw'
}
