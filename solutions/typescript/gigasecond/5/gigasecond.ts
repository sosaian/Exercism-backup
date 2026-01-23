const GIGASECOND = 1_000_000_000

export class Gigasecond {
    readonly #milisecondsAfterGigasecond: number

    constructor(startingDate: Date) { this.#milisecondsAfterGigasecond = startingDate.getTime() + (GIGASECOND * 1000) }

    public date(): Date { return new Date(this.#milisecondsAfterGigasecond) }
}
