const MINUTES_IN_A_DAY = 1440
const MINUTES_IN_AN_HOUR = 60

export class Clock {
    #totalMinutes: number
    
    #calculateTotalMinutes(hour: number, minute: number = 0): number {
        let accumulativeMinutes = (hour * 60) + minute 

        return ((accumulativeMinutes % MINUTES_IN_A_DAY) + MINUTES_IN_A_DAY) % MINUTES_IN_A_DAY
    }
    
    constructor(hour: number, minute: number = 0) {
        this.#totalMinutes = this.#calculateTotalMinutes(hour, minute)
    }

    #getClockHours(): number { return Math.floor(this.#totalMinutes / MINUTES_IN_AN_HOUR) }

    #getClockMinutes(): number { return this.#totalMinutes % MINUTES_IN_AN_HOUR }

    public toString(): string {
        const clockHour = this.#getClockHours().toString().padStart(2,"0")
        const clockMinute = this.#getClockMinutes().toString().padStart(2,"0")

        return `${clockHour}:${clockMinute}`
    }

    public plus(minutes: number): Clock {
        return new Clock(0, this.#totalMinutes + minutes)
    }

    public minus(minutes: number): Clock {
        return new Clock(0, this.#totalMinutes - minutes)
    }

    public equals(other: Clock): boolean {
        return this.#totalMinutes === other.#totalMinutes
    }
}
