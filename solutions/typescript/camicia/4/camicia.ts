const NUMBER_CARDS = ['2','3','4','5','6','7','8','9','10'] as const

type NumberCard = typeof NUMBER_CARDS[number]

function isNumberCard(card: string): card is NumberCard {
    return (
        card === '2' ||
        card === '3' ||
        card === '4' ||
        card === '5' ||
        card === '6' ||
        card === '7' ||
        card === '8' ||
        card === '9' ||
        card === '10'
    )
}

const CAMICIA_PENALTY_SCORES = { J: 1, Q: 2, K: 3, A: 4 } as const
type PaymentCard = keyof typeof CAMICIA_PENALTY_SCORES

type CamiciaCard =
| { kind: 'number', value: NumberCard }
| { kind: 'payment', value: PaymentCard }

type PlayerId = 'A' | 'B'

export type CamiciaScoresheet = {
    status: 'finished' | 'loop'
    cards: number
    tricks: number
}

function isPaymentCard(card: string): card is PaymentCard {
    for (const camiciaPaymentCard of Object.keys(CAMICIA_PENALTY_SCORES)) {
        if (camiciaPaymentCard === card) return true
    }

    return false
}

function toCamiciaDeck(deck: string[]): CamiciaCard[] {
    const camiciaDeck: CamiciaCard[] = []
    
    for (const card of deck) {
        if (isNumberCard(card)) {
            camiciaDeck.push({ kind:'number', value:card })
        } else if (isPaymentCard(card)) {
            camiciaDeck.push({ kind:'payment', value:card })
        } else {
            throw new Error('Invalid card deck.')
        }
    }
    
    return camiciaDeck
}

function opponent(player: PlayerId): PlayerId { return player === 'A' ? 'B' : 'A' }

class CamiciaGame {
    #deckA: CamiciaCard[]
    #deckB: CamiciaCard[]
    #pile: CamiciaCard[] = []
    
    #turn: PlayerId = 'A'
    #attacker: PlayerId | null = null
    #penaltyRemaining = 0
    
    #cardsPlayed = 0
    #tricksWon = 0
    readonly #totalCards: number

    constructor(playerA: CamiciaCard[], playerB: CamiciaCard[]) {
        this.#deckA = playerA
        this.#deckB = playerB
        this.#totalCards = this.#deckA.length + this.#deckB.length
    }
    
    #serializeDeck (deck: CamiciaCard[]) {
        return deck
            .map(card => card.kind === 'payment'
                ? card.value
                : 'N' // Number card
            ).join('')
    }

    public getCanonicalState(): string {
        return [
            this.#serializeDeck(this.#deckA),
            this.#serializeDeck(this.#deckB),
            this.#serializeDeck(this.#pile),
            this.#turn,
            this.#attacker,
            this.#penaltyRemaining
        ].join('|')
    }

    public getScoresheet(status: 'finished' | 'loop'): CamiciaScoresheet {
        return {
            status,
            cards: this.#cardsPlayed,
            tricks: this.#tricksWon,
        }
    }

    #resolveTrick(winner: PlayerId): boolean {
        this.#tricksWon++
        
        const targetDeck = winner === 'A' ? this.#deckA : this.#deckB
        targetDeck.push(...this.#pile)
        this.#pile = []

        this.#attacker = null
        this.#penaltyRemaining = 0
        this.#turn = winner

        if (targetDeck.length === this.#totalCards) return true
        
        return false
    }

    public step(): boolean {
        const activeDeck = this.#turn === 'A' ? this.#deckA : this.#deckB

        if (activeDeck.length === 0) {
            const winner = opponent(this.#turn)
            
            if (this.#pile.length > 0) {
                const instantWin = this.#resolveTrick(winner)
        
                if (instantWin) return true
            }
            
            return true
        }

        const card = activeDeck.shift()
        if (card === undefined) throw new Error('Invalid card in deck!')
        this.#pile.push(card)
        this.#cardsPlayed++

        if (card.kind === 'payment') {
            this.#attacker = this.#turn
            this.#penaltyRemaining = CAMICIA_PENALTY_SCORES[card.value]
            this.#turn = opponent(this.#turn)
        
            return false
        }

        if (this.#penaltyRemaining > 0) {
            this.#penaltyRemaining--

            if (this.#penaltyRemaining === 0) {
                if (this.#attacker === null) throw new Error('Null attacker state!')
                return this.#resolveTrick(this.#attacker) 
            }
            
            return false
        }

        this.#turn = opponent(this.#turn)
        return false
    }
}

function simulateCamiciaGame(playerA: CamiciaCard[], playerB: CamiciaCard[]): CamiciaScoresheet {
    const game = new CamiciaGame(playerA, playerB)
    const history = new Set<string>()

    while (true) {
        const stateHash = game.getCanonicalState()
        
        if (history.has(stateHash)) return game.getScoresheet('loop')
        
        history.add(stateHash)

        const isFinished = game.step()
        
        if (isFinished) return game.getScoresheet('finished')
    }
}

export function simulateGame(playerA: string[], playerB: string[]): CamiciaScoresheet {
    const deckA = toCamiciaDeck(playerA)
    const deckB = toCamiciaDeck(playerB)

    return simulateCamiciaGame(deckA, deckB)
}