const PLANET_ORBITAL_PERIOD_IN_EARTH_YEARS: Record<string, number> = {
    mercury:    0.2408467,
    venus:      0.61519726,
    earth:      1,
    mars:       1.8808158,
    jupiter:    11.862615,
    saturn:     29.447498,
    uranus:     84.016846,
    neptune:    164.79132
}

export function age(planet: string, seconds: number): number {
    const ORBITAL_PERIOD_IN_EARTH_YEARS = PLANET_ORBITAL_PERIOD_IN_EARTH_YEARS[planet]
    
    if (!ORBITAL_PERIOD_IN_EARTH_YEARS)
        throw new Error('Invalid planet; remember pluto is no longer considered a planet :)')
    
    const SECONDS_TO_EARTH_YEARS = seconds / 60 / 60 / 24 / 365.25

    return Math.round(SECONDS_TO_EARTH_YEARS / ORBITAL_PERIOD_IN_EARTH_YEARS *100) / 100
}