const GIGASECOND = 1_000_000_000

export class Gigasecond {
    readonly #dateAfterGigasecond: Date

    constructor(startingDate: Date) { 
        this.#dateAfterGigasecond = new Date((startingDate.getTime() + (GIGASECOND * 1000)))
    }

    public date(): Date { return this.#dateAfterGigasecond }
}
