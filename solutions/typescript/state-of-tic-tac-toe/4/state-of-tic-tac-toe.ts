type Gamestate = 'ongoing' | 'draw' | 'win'
type Cell = 'X' | 'O' | ' '
type Line = [Cell, Cell, Cell]
type Board = [Line, Line, Line]
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

    const parsed: Line[] = []
    let countX = 0
    let countO = 0

    for (const row of input) {
        if (row.length !== 3) { throw new Error(ERRORS.rowLength)}
    
        const parsedRow: Cell[] = []

        for (const char of row) {
            if (!isCell(char)) { throw new Error(ERRORS.badChar) }

            if (char === 'X') countX++
            if (char === 'O') countO++

            parsedRow.push(char)
        }

        parsed.push([
            parsedRow[0],
            parsedRow[1],
            parsedRow[2],
        ])
    }

    if (countO > countX) { throw new Error(ERRORS.turnOrder.negative) }
    if (countX > countO + 1) { throw new Error(ERRORS.turnOrder.tooManyX) }

    const diff = countX - countO as 0 | 1

    return {
        board: parsed as Board,
        moves: { countX, countO, diff }
    }
}

function evaluate(board: Board, moves: MoveCount): Gamestate {
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

    let hasXwon = false
    let hasOwon = false

    for (const line of WIN_LINES) {
        const [a,b,c] = line.map(([r,c]) => board[r][c])

        if (a !== ' ' && a === b && a === c) {
            if (a === 'X') hasXwon = true
            else hasOwon = true
        }
    }
    
    if (hasXwon && hasOwon) throw new Error(ERRORS.impossible)

    if (hasXwon && moves.diff !== 1) throw new Error(ERRORS.impossible)

    if (hasOwon && moves.diff !== 0) throw new Error(ERRORS.impossible)

    if (hasXwon || hasOwon) return 'win'

    if (board.some(row => row.includes(' '))) return 'ongoing'

    return 'draw'
}

export function gamestate(input: string[]): Gamestate {
    const { board, moves } = parseBoard(input)
    return evaluate(board, moves)
}
