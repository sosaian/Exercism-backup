const OPERANDS = ['plus', 'minus', 'multiply', 'divide'] as const
type Operand = typeof OPERANDS[number]

function isOperand(value: string): value is Operand { 
    return (OPERANDS as readonly string[]).includes(value)
}

type OperationTuple = 
| []
| [number]
| [number, Operand]
| [number, Operand, number]

type NormalizedToken = 
| { kind: 'number'; value: number }
| { kind: 'operand'; value: Operand }

const FILLER_WORDS = new Set(['what', 'is', '?'])

const SYNTAX_ERROR = new Error('Syntax error')
const UNKNOWN_OPERATION = new Error('Unknown operation')

function normalize(tokens: string[]): NormalizedToken[] {
    const normalized: NormalizedToken[] = []

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i].toLowerCase()

        // 1. filler words
        if (FILLER_WORDS.has(token)) { continue }

        // 2. numbers
        const value = Number(token)
        if (!Number.isNaN(value)) {
            normalized.push({ kind: 'number', value })
            continue
        }

        // 3. multi-word operands
        if (token === 'multiplied' || token === 'divided') {
            const next = tokens[i + 1]?.toLowerCase()
            if (next !== 'by') throw SYNTAX_ERROR

            normalized.push({
                kind: 'operand',
                value: token === 'multiplied' ? 'multiply' : 'divide'
            })

            i++ // consume "by"
            continue
        }

        // 4. single-word operands
        if (isOperand(token)) {
            normalized.push({ kind: 'operand', value: token })
            continue
        }

        // 5. everything else
        throw UNKNOWN_OPERATION
    }

    return normalized
}

export const answer = (inputText: string): number => {
    let rawTokens = inputText.match(/[A-Za-z]+|[-0-9]+|[?]/g)
    if (rawTokens === null) { throw UNKNOWN_OPERATION }
    
    const normalizedTokens = normalize(rawTokens)

    let result = 0
    let operation: OperationTuple = []
    
    for (const token of normalizedTokens) {
        switch (operation.length) {
            case 0:
                if (token.kind !== 'number') throw SYNTAX_ERROR
                operation = [token.value]
                break
            case 1:
                if (token.kind !== 'operand') throw SYNTAX_ERROR
                operation = [operation[0], token.value]
                break
            case 2:
                if (token.kind !== 'number') throw SYNTAX_ERROR
                operation = [operation[0], operation[1], token.value]
                switch (operation[1]) {
                    case 'plus': result = operation[0] + operation[2]
                        break
                    case 'minus': result = operation[0] - operation[2]
                        break
                    case 'multiply': result = operation[0] * operation[2]
                        break
                    case 'divide': result = operation[0] / operation[2]
                        break
                }
                operation = [result]
                continue
        }
    }

    if (operation.length !== 1) throw SYNTAX_ERROR

    return operation[0]
}
