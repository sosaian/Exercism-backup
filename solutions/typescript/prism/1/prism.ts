type Start = { x: number, y: number, angle: number }
type Point = { x: number, y: number }
type Vector = { x: number, y: number }
type Ray = { origin: Point, direction: Vector }
type Prism = { id: number, position: Point, deflectionAngle: number }

// 1e-4 is the sweet spot for geometric algorithms dealing with IEEE-754 floats
const EPSILON = 1e-4
const PI = Math.PI

function normalizedAngle(angle: number): number { return ((angle % 360) + 360) % 360 }
function toRadians(angle: number): number { return angle * (PI / 180) }

function angleToUnitVector(angleDeg: number): Vector {
    const r = toRadians(normalizedAngle(angleDeg))
    return { x: Math.cos(r), y: Math.sin(r) }
}

function dotProduct(a: Vector, b: Vector): number { return a.x * b.x + a.y * b.y }

function crossProduct(a: Vector, b: Vector): number { return a.x * b.y - a.y * b.x }

function isCollinear(direction: Vector, toTargetUnit: Vector): boolean {
    return Math.abs(crossProduct(direction, toTargetUnit)) < EPSILON
}

function isForward(direction: Vector, toTargetUnit: Vector): boolean {
    return dotProduct(direction, toTargetUnit) > EPSILON
}

function normalize(v: Vector, magnitude: number): Vector {
    if (magnitude === 0) return { x: 0, y: 0 }
    return { x: v.x / magnitude, y: v.y / magnitude }
}

function findNextPrism(ray: Ray, prisms: Prism[]): Prism | null {
    let closest: Prism | null = null
    let minDistance = Infinity

    for (const prism of prisms) {
        const toPrism: Vector = {
            x: prism.position.x - ray.origin.x,
            y: prism.position.y - ray.origin.y,
        }

        const distance = Math.sqrt(toPrism.x * toPrism.x + toPrism.y * toPrism.y)
        if (distance < EPSILON) continue

        const toPrismUnit = normalize(toPrism, distance)

        if (!isCollinear(ray.direction, toPrismUnit)) continue
        if (!isForward(ray.direction, toPrismUnit)) continue

        if (distance < minDistance) {
            minDistance = distance
            closest = prism
        }
    }

    return closest
}

export function findSequence(
    start: Start,
    prisms: Array<{ id: number, x: number, y: number, angle: number }>
): number[] {
    const parsedPrisms: Prism[] = prisms.map(p => ({
        id: p.id,
        position: { x: p.x, y: p.y },
        deflectionAngle: p.angle
    }))
    
    const sequence: number[] = []
    const visited = new Set<string>()
    
    let currentAngle = start.angle
    
    let ray: Ray = {
        origin: { x: start.x, y: start.y },
        direction: angleToUnitVector(currentAngle)
    }

    while (true) {
        const next = findNextPrism(ray, parsedPrisms)
        if (!next) break

        sequence.push(next.id)
        ray.origin = next.position

        currentAngle += next.deflectionAngle
        ray.direction = angleToUnitVector(currentAngle)

        const key = `${ray.origin.x.toFixed(3)}:${ray.origin.y.toFixed(3)}:${normalizedAngle(currentAngle).toFixed(3)}`
        
        if (visited.has(key)) break
        visited.add(key)
    }

    return sequence
}