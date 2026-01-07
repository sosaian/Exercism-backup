export class Clock {
    #clockHour : number
    #clockMinute : number
    
    constructor(hour: number, minute?: number) {
        let accumulativeMinutes = hour * 60 
        
        if (minute !== undefined) { accumulativeMinutes += minute }
        
        // Minutes in a day: 24 * 60 = 1440
        accumulativeMinutes = accumulativeMinutes % 1440

        if (accumulativeMinutes < 0) { accumulativeMinutes = 1440 + accumulativeMinutes }
        
        this.#clockHour = Math.floor(accumulativeMinutes / 60)
        this.#clockMinute = accumulativeMinutes % 60
    }

    public toString(): string {
        return `${this.#clockHour.toString().padStart(2,"0")}:${this.#clockMinute.toString().padStart(2,"0")}`
    }

    public plus(minutes: number): Clock {
        return new Clock(this.#clockHour, this.#clockMinute + minutes)
    }

    public minus(minutes: number): Clock {
        return new Clock(this.#clockHour, this.#clockMinute - minutes)
    }

    public equals(other: Clock): boolean {
        return this.toString() === other.toString()
    }
}
