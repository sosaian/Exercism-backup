// --- 1. Constants & Derived Types (Single Source of Truth) ---

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

// --- 2. Helper Functions & Type Guards ---

function isPaymentCard(card: string): card is PaymentCard {
    for (const camiciaPaymentCard of Object.keys(CAMICIA_PENALTY_SCORES)) {
        if (camiciaPaymentCard === card) return true
    }

    return false
}

function toCamiciaDeck(deck: string[]): Array<CamiciaCard> {
    const camiciaDeck: Array<CamiciaCard> = []
    
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

// --- 3. The Game Engine (Class-Based) ---

class CamiciaGame {
    private deckA: Array<CamiciaCard>
    private deckB: Array<CamiciaCard>
    private pile: Array<CamiciaCard> = []
    
    // Game State
    private turn: PlayerId = 'A'
    private attacker: PlayerId | null = null
    private penaltyRemaining = 0
    
    // Stats
    private cardsPlayed = 0
    private tricksWon = 0
    private totalCards: number

    constructor(playerA: Array<CamiciaCard>, playerB: Array<CamiciaCard>) {
        this.deckA = playerA
        this.deckB = playerB
        this.totalCards = this.deckA.length + this.deckB.length
    }

    /**
     * Generates a string representation of the current state for loop detection.
     * Only includes essential state data.
     */
    
    // Helper to serialize a deck efficiently
    private serializeDeck (deck: Array<CamiciaCard>) {
        return deck
            .map(card => card.kind === 'payment'
                ? card.value
                : 'N' // Number card
            ).join('')
    }

    public getCanonicalState(): string {
        return [
            this.serializeDeck(this.deckA),
            this.serializeDeck(this.deckB),
            this.serializeDeck(this.pile),
            this.turn,
            this.attacker,
            this.penaltyRemaining
        ].join('|')
    }

    public getScoresheet(status: 'finished' | 'loop'): CamiciaScoresheet {
        return {
            status,
            cards: this.cardsPlayed,
            tricks: this.tricksWon,
        }
    }

    /**
     * Resolves a trick: moves pile to winner, updates stats, and CHECKS WIN CONDITION.
     * Returns true if the game ended immediately (winner has all cards).
     */
    private resolveTrick(winner: PlayerId): boolean {
        this.tricksWon++
        
        // Move pile to winner's deck
        const targetDeck = winner === 'A' ? this.deckA : this.deckB
        targetDeck.push(...this.pile)
        this.pile = []

        // Reset round state
        this.attacker = null
        this.penaltyRemaining = 0
        this.turn = winner

        if (targetDeck.length === this.totalCards) return true
        
        return false
    }

    /**
     * Executes one step of the simulation.
     * Returns false if the game continues, true if it finishes.
     */
    public step(): boolean {
        const activeDeck = this.turn === 'A' ? this.deckA : this.deckB

        // Case 1: Active player has no cards to play
        if (activeDeck.length === 0) {
            /**
             * - If a penalty was active, the attacker wins the trick
             * - If no penalty (normal play), the opponent wins by default rules
             * - In both cases, the opponent collects the pile.
             */
            const winner = opponent(this.turn)
            
            /**
             * Even if the pile is empty, the logic holds: opponent survives, current player loses.
             * (But typically this happens when trying to pay a penalty.)
             */
            if (this.pile.length > 0) {
                // Resolve trick creates the "Win" state if they get all cards
                const instantWin = this.resolveTrick(winner)
        
                if (instantWin) return true
            }
            
            /**
             * - If we are here, the active player is empty, but the opponent didn't
             * instantly win via CamiciaCard count (unlikely in 2p game, but safe to check).
             * - If player A is empty and it's their turn, B wins.
             */
            return true
        }

        // Case 2: Play a card
        const card = activeDeck.shift()
        if (card === undefined) throw new Error('Invalid card in deck!')
        this.pile.push(card)
        this.cardsPlayed++

        // -- Logic Branching --

        if (card.kind === 'payment') {
            // Payment card interrupts everything. 
            // It becomes an attack (or counter-attack).
            this.attacker = this.turn
            this.penaltyRemaining = CAMICIA_PENALTY_SCORES[card.value]
            this.turn = opponent(this.turn)
        
            return false // Game continues
        }

        // It's a Number card
        if (this.penaltyRemaining > 0) {
            // We are in a penalty phase, trying to defend
            this.penaltyRemaining--
            
            // Defense failed! Attacker takes the pile.
            // The resolveTrick method returns true if this trick ended the game.
            if (this.penaltyRemaining === 0) {
                if (this.attacker === null) throw new Error('Null attacker state!')
                return this.resolveTrick(this.attacker) 
            }
            
            // Defense continues, still same player's turn to pay
            return false
        }

        // Normal play, no penalty active
        this.turn = opponent(this.turn)
        return false
    }
}

// --- 4. Main Simulation Loop ---

function simulateCamiciaGame(playerA: Array<CamiciaCard>, playerB: Array<CamiciaCard>): CamiciaScoresheet {
    const game = new CamiciaGame(playerA, playerB)
    const history = new Set<string>()

    while (true) {
        // 1. Check Loop
        const stateHash = game.getCanonicalState()
        
        if (history.has(stateHash)) return game.getScoresheet('loop')
        
        history.add(stateHash)

        // 2. Advance Game
        const isFinished = game.step()
        
        if (isFinished) return game.getScoresheet('finished')
    }
}

export function simulateGame(playerA: string[], playerB: string[]): CamiciaScoresheet {
    const deckA = toCamiciaDeck(playerA)
    const deckB = toCamiciaDeck(playerB)

    return simulateCamiciaGame(deckA, deckB)
}