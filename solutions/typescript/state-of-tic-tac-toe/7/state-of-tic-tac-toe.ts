type Gamestate = 'ongoing' | 'draw' | 'win'
type Cell = 'X' | 'O' | ' '
type Line = readonly [Cell, Cell, Cell]
type Board = readonly [Line, Line, Line]
type MoveCount =
| { countX: number; countO: number; diff: 0 }
| { countX: number; countO: number; diff: 1 }

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

function parseBoard(input: string[]): {
    board: Board,
    moves: MoveCount,
} {
    if (input.length !== 3) { throw new Error(ERRORS.boardSize) }

    let countX = 0
    let countO = 0

    const parseRow = (row: string): Line => {
        if (row.length !== 3) { throw new Error(ERRORS.rowLength)}

        const cell0 = row[0]
        const cell1 = row[1]
        const cell2 = row[2]

        if (!isCell(cell0) || !isCell(cell1) || !isCell(cell2)) {
            throw new Error(ERRORS.badChar)
        }

        if (cell0 === 'X') countX++
        if (cell0 === 'O') countO++
        
        if (cell1 === 'X') countX++
        if (cell1 === 'O') countO++
        
        if (cell2 === 'X') countX++
        if (cell2 === 'O') countO++

        return [cell0, cell1, cell2]
    }

    const board: Board = [
        parseRow(input[0]),
        parseRow(input[1]),
        parseRow(input[2])
    ]

    // Validation: Check if players took turns correctly
    if (countO > countX) { throw new Error(ERRORS.turnOrder.negative) }
    if (countX > countO + 1) { throw new Error(ERRORS.turnOrder.tooManyX) }

    /**
     * Since X always starts, a valid board must always have either an equal number 
     * of marks (O just moved) or exactly one more X (X just moved). Any other state
     * implies a player skipped a turn or moved twice.
     */
    const diff = countX === countO ? 0 : 1

    return { board, moves: { countX, countO, diff } }
}

const WIN_LINES = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
] as const

function countWins(board: Board): { xWins: number, oWins: number } {
    let xWins = 0
    let oWins = 0

    for (const line of WIN_LINES) {
        const [cell0, cell1, cell2] = line.map(([row, col]) => board[row][col])

        if (cell0 !== ' ' && cell0 === cell1 && cell0 === cell2) {
            if (cell0 === 'X') xWins++
            else oWins++
        }
    }

    return { xWins, oWins }
}

/**
 * To ensure the game didn't continue after a win, I verify that there is at least
 * one winning piece that, if removed, results in a board with zero wins for that
 * player. This proves the winning move was actually the _last_ move made.
 */
function isLegalTerminal(board: Board, player: 'X' | 'O'): boolean {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === player) {
                const cell0 = col === 0 ? ' ' : board[row][0]
                const cell1 = col === 1 ? ' ' : board[row][1]
                const cell2 = col === 2 ? ' ' : board[row][2]

                const modifiedBoard: Board = [
                    row === 0 ? [cell0,cell1,cell2] : board[0],
                    row === 1 ? [cell0,cell1,cell2] : board[1],
                    row === 2 ? [cell0,cell1,cell2] : board[2],
                ]

                const { xWins, oWins } = countWins(modifiedBoard)
                const winsAfterRemoval = player === 'X' ? xWins : oWins

                if (winsAfterRemoval === 0) return true
            }
        }
    }

    return false
}

function evaluate(board: Board, moves: MoveCount): Gamestate {
    let { xWins, oWins } = countWins(board)
    
    // Rule: The game ends immediately; players cannot both have winning lines.
    if (xWins > 0 && oWins > 0) throw new Error(ERRORS.impossible)
    
    // Rule: The winner must be the player who just moved.
    if (xWins > 0 && moves.diff !== 1) throw new Error(ERRORS.impossible)
    if (oWins > 0 && moves.diff !== 0) throw new Error(ERRORS.impossible)

    // Rule: If someone won, the board must reflect exactly one "final" move.
    if (xWins > 0 && !isLegalTerminal(board, 'X')) throw new Error(ERRORS.impossible)
    if (oWins > 0 && !isLegalTerminal(board, 'O')) throw new Error(ERRORS.impossible)
    
    if (xWins > 0 || oWins > 0) return 'win'
    if (board.some(row => row.includes(' '))) return 'ongoing'

    return 'draw'
}

export function gamestate(input: string[]): Gamestate {
    const { board, moves } = parseBoard(input)
    return evaluate(board, moves)
}
