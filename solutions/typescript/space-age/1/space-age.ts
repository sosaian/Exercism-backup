export function age(planet: string, seconds: number): number {
    const SECONDS_TO_EARTH_YEARS = seconds / 60 / 60 / 24 / 365.25

    switch (planet) {
        case "earth":
            return Math.round(SECONDS_TO_EARTH_YEARS * 100) / 100
        case "mercury":
            return Math.round(SECONDS_TO_EARTH_YEARS / 0.2408467 * 100) / 100
        case "venus":
            return Math.round(SECONDS_TO_EARTH_YEARS / 0.61519726 * 100) / 100
        case "mars":
            return Math.round(SECONDS_TO_EARTH_YEARS / 1.8808158 * 100) / 100
        case "jupiter":
            return Math.round(SECONDS_TO_EARTH_YEARS / 11.862615 * 100) / 100
        case "saturn":
            return Math.round(SECONDS_TO_EARTH_YEARS / 29.447498 * 100) / 100
        case "uranus":
            return Math.round(SECONDS_TO_EARTH_YEARS / 84.016846 * 100) / 100
        case "neptune":
            return Math.round(SECONDS_TO_EARTH_YEARS / 164.79132 * 100) / 100
        default:  
            throw new Error('Invalid planet; remember pluto is no longer considered a planet :)')
    }
}
