type Start = { x: number, y: number, angle: number }
type Point = { x: number, y: number }
type Vector = { x: number, y: number }
type Ray = { origin: Point, direction: Vector }
type Prism = { id: number, position: Point, deflectionAngle: number }

/**
 * Epsilon defines the error tolerance for geometric algorithms dealing
 * with IEEE-754 floats
 */
const EPSILON = 1e-4

const PI = Math.PI

function normalizedAngle(angle: number): number { return ((angle % 360) + 360) % 360 }
function toRadians(angleDeg: number): number { return angleDeg * (PI / 180) }

function angleToUnitVector(angleDeg: number): Vector {
    const r = toRadians(normalizedAngle(angleDeg))
    return { x: Math.cos(r), y: Math.sin(r) }
}

function rotate(v: Vector, angleDeg: number): Vector {
    const r = toRadians(angleDeg)
    const cos = Math.cos(r)
    const sin = Math.sin(r)

    return {
        x: v.x * cos - v.y * sin,
        y: v.x * sin + v.y * cos,
    }
}

function dot(a: Vector, b: Vector): number { return a.x * b.x + a.y * b.y }

function cross(a: Vector, b: Vector): number { return a.x * b.y - a.y * b.x }

function magnitude(v: Vector): number { return Math.sqrt(v.x * v.x + v.y * v.y) }

function normalize(v: Vector): Vector {
    const m = magnitude(v)
    return { x: v.x / m, y: v.y / m}
}

// Returns the closest prism that is aligned with the ray and in front of it.
function findNextPrism(ray: Ray, prisms: Prism[]): Prism | null {
    let closest: Prism | null = null
    let minDistance = Infinity

    for (const prism of prisms) {
        const toPrism: Vector = {
            x: prism.position.x - ray.origin.x,
            y: prism.position.y - ray.origin.y,
        }

        const distance = magnitude(toPrism)

        // Ignore when the positions practically overlap
        // (the prism the ray is currently on)
        if (distance < EPSILON) continue

        const toPrismUnit = normalize(toPrism)

        /**
         * Alignment check:
         * The cross product of two unit vectors is the sine of the angle
         * between them. If the sine is nearly 0, they are collinear.
         */
        if (Math.abs(cross(ray.direction, toPrismUnit)) >= EPSILON) continue
        
        /**
         * Direction check:
         * The dot product must be positive for the prism to be "in front".
         */
        if (dot(ray.direction, toPrismUnit) <= 0) continue

        if (distance < minDistance) {
            minDistance = distance
            closest = prism
        }
    }

    return closest
}

export function findSequence(
    start: Start,
    prismsInput: Array<{ id: number; x: number; y: number; angle: number }>
): number[] {
    const prisms: Prism[] = prismsInput.map(p => ({
        id: p.id,
        position: { x: p.x, y: p.y },
        deflectionAngle: p.angle,
    }))

    const sequence: number[] = []

    let ray: Ray = {
        origin: { x: start.x, y: start.y },
        direction: angleToUnitVector(start.angle),
    }

    // Minimal deterministic state:
    // (current prism, current direction)
    const visited = new Set<string>()

    while (true) {
        const next = findNextPrism(ray, prisms)
        if (!next) break

        sequence.push(next.id)
        ray.origin = next.position

        // Rotate the ray and immediately normalize to prevent floating-point "shrinkage"
        ray.direction = rotate(ray.direction, next.deflectionAngle)

        // State key: (Prism ID + Direction). If we hit the same prism from 
        // the same angle, we are in an infinite loop.
        const key = `${next.id}:${ray.direction.x.toFixed(4)}:${ray.direction.y.toFixed(4)}`

        if (visited.has(key)) break
        visited.add(key)
    }

    return sequence
}
