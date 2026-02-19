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

    if (countO > countX) { throw new Error(ERRORS.turnOrder.negative) }
    if (countX > countO + 1) { throw new Error(ERRORS.turnOrder.tooManyX) }

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

function evaluate(board: Board, moves: MoveCount): Gamestate {
    let hasXwon = false
    let hasOwon = false

    for (const line of WIN_LINES) {
        const [cell0, cell1, cell2] = line.map(([row, col]) => board[row][col])

        if (cell0 !== ' ' && cell0 === cell1 && cell0 === cell2) {
            if (cell0 === 'X') hasXwon = true
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
