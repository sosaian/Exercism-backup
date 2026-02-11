// camicia.ts

// --- 1. Constants & Derived Types (Single Source of Truth) ---

const PAYMENT_VALUES = {
  J: 1,
  Q: 2,
  K: 3,
  A: 4,
} as const;

// Derive types automatically from the data
type PaymentRank = keyof typeof PAYMENT_VALUES;
const PAYMENT_RANKS = Object.keys(PAYMENT_VALUES) as readonly PaymentRank[];

type Card =
  | { kind: 'number'; value: string }
  | { kind: 'payment'; rank: PaymentRank; value: number };

type PlayerId = 'A' | 'B';

export type CamiciaScoresheet = {
  status: 'finished' | 'loop';
  cards: number;
  tricks: number;
};

// --- 2. Helper Functions & Type Guards ---

function isPaymentRank(card: string): card is PaymentRank {
  return (PAYMENT_RANKS as readonly string[]).includes(card);
}

function parseDeck(rawCards: string[]): Card[] {
  return rawCards.map((c) => {
    if (isPaymentRank(c)) {
      return { kind: 'payment', rank: c, value: PAYMENT_VALUES[c] };
    }
    return { kind: 'number', value: c };
  });
}

function opponent(p: PlayerId): PlayerId {
  return p === 'A' ? 'B' : 'A';
}

// --- 3. The Game Engine (Class-Based) ---

class CamiciaGame {
  private deckA: Card[];
  private deckB: Card[];
  private pile: Card[] = [];
  
  // Game State
  private turn: PlayerId = 'A';
  private attacker: PlayerId | null = null;
  private penaltyRemaining = 0;
  
  // Stats
  private cardsPlayed = 0;
  private tricksWon = 0;
  private totalCards: number;

  constructor(rawDeckA: string[], rawDeckB: string[]) {
    this.deckA = parseDeck(rawDeckA);
    this.deckB = parseDeck(rawDeckB);
    this.totalCards = this.deckA.length + this.deckB.length;
  }

  /**
   * Generates a string representation of the current state for loop detection.
   * Only includes essential state data.
   */
  public getCanonicalState(): string {
    // Helper to serialize a deck efficiently
    const serializeDeck = (d: Card[]) => 
      d.map(c => (c.kind === 'payment' ? c.rank : 'N')).join('');

    return [
      serializeDeck(this.deckA),
      serializeDeck(this.deckB),
      serializeDeck(this.pile),
      this.turn,
      this.attacker ?? '_',
      this.penaltyRemaining
    ].join('|');
  }

  public getScoresheet(status: 'finished' | 'loop'): CamiciaScoresheet {
    return {
      status,
      cards: this.cardsPlayed,
      tricks: this.tricksWon,
    };
  }

  /**
   * Resolves a trick: moves pile to winner, updates stats, and CHECKS WIN CONDITION.
   * Returns true if the game ended immediately (winner has all cards).
   */
  private resolveTrick(winner: PlayerId): boolean {
    this.tricksWon++;
    
    // Move pile to winner's deck
    const targetDeck = winner === 'A' ? this.deckA : this.deckB;
    targetDeck.push(...this.pile);
    this.pile = [];

    // Reset round state
    this.attacker = null;
    this.penaltyRemaining = 0;
    this.turn = winner;

    // *** CRITICAL FIX: Check for total victory immediately ***
    if (targetDeck.length === this.totalCards) {
      return true; 
    }
    return false;
  }

  /**
   * Executes one step of the simulation.
   * Returns false if the game continues, true if it finishes.
   */
  public step(): boolean {
    const activeDeck = this.turn === 'A' ? this.deckA : this.deckB;

    // Case 1: Active player has no cards to play
    if (activeDeck.length === 0) {
      // If a penalty was active, the attacker wins the trick
      // If no penalty (normal play), the opponent wins by default rules
      // In both cases, the opponent collects the pile.
      const winner = opponent(this.turn);
      
      // Even if the pile is empty, the logic holds: opponent survives, current player loses.
      // But typically this happens when trying to pay a penalty.
      if (this.pile.length > 0) {
         // Resolve trick creates the "Win" state if they get all cards
         const instantWin = this.resolveTrick(winner);
         if (instantWin) return true;
      }
      
      // If we are here, the active player is empty, but the opponent didn't 
      // instantly win via card count (unlikely in 2p game, but safe to check).
      // If player A is empty and it's their turn, B wins.
      return true;
    }

    // Case 2: Play a card
    const card = activeDeck.shift()!;
    this.pile.push(card);
    this.cardsPlayed++;

    // -- Logic Branching --

    if (card.kind === 'payment') {
      // Payment card interrupts everything. 
      // It becomes an attack (or counter-attack).
      this.attacker = this.turn;
      this.penaltyRemaining = card.value;
      this.turn = opponent(this.turn);
      return false; // Game continues
    }

    // It's a Number card
    if (this.penaltyRemaining > 0) {
      // We are in a penalty phase, trying to defend
      this.penaltyRemaining--;
      
      if (this.penaltyRemaining === 0) {
        // Defense failed! Attacker takes the pile.
        // The resolveTrick method returns true if this trick ended the game.
        return this.resolveTrick(this.attacker!); 
      }
      
      // Defense continues, still same player's turn to pay
      return false;
    }

    // Normal play, no penalty active
    this.turn = opponent(this.turn);
    return false;
  }
}

// --- 4. Main Simulation Loop ---

export function simulateGame(playerA: string[], playerB: string[]): CamiciaScoresheet {
  const game = new CamiciaGame(playerA, playerB);
  const history = new Set<string>();

  while (true) {
    // 1. Check Loop
    const stateHash = game.getCanonicalState();
    if (history.has(stateHash)) {
      return game.getScoresheet('loop');
    }
    history.add(stateHash);

    // 2. Advance Game
    const isFinished = game.step();
    if (isFinished) {
      return game.getScoresheet('finished');
    }
  }
}