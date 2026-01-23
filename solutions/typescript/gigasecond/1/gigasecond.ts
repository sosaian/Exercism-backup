const GIGASECOND = 1_000_000_000

export class Gigasecond {
    readonly #dateAfterGigasecond: Date

    constructor(startingDate: Date) { 
        this.#dateAfterGigasecond = this.#computeDateAfterGigasecond(startingDate)
    }
    
    #computeDateAfterGigasecond(inputDate: Date): Date {
        const dateInSeconds = Math.floor(inputDate.getTime() / 1000)
        return new Date((dateInSeconds + GIGASECOND) * 1000)
    }

    public date(): Date { return this.#dateAfterGigasecond }
}
