type Sides = readonly [number, number, number]
type TriangleKind = "equilateral" | "isosceles" | "scalene"
type TriangleState = TriangleKind | "not a triangle"

export class Triangle {
    readonly #triangleType: TriangleState 
    
    #isTriangle(sides: Sides): boolean {
        return (
            sides[0] > 0 &&
            sides[1] > 0 &&
            sides[2] > 0 &&
            sides[0] + sides[1] >= sides[2] && // Degenerate triangles are valid
            sides[1] + sides[2] >= sides[0] && // triangles in this exercise
            sides[0] + sides[2] >= sides[1]    // as per the README.md
        ) 
    }

    #computeTriangleType(sides: Sides): TriangleKind {
        if (sides[0] === sides[1] && sides[1] === sides[2]) { return "equilateral" }
        else if (sides[0] === sides[1] || sides[1] === sides[2] || sides[0] === sides[2]) { return "isosceles" }
        return "scalene"
    }

    constructor(...sides: Sides) {        
        if (!this.#isTriangle(sides)) {
            this.#triangleType = "not a triangle"
            return
        }

        this.#triangleType = this.#computeTriangleType(sides)
    }

    get isEquilateral() { return this.#triangleType === "equilateral" }

    get isIsosceles() { return this.#triangleType === "isosceles" || this.#triangleType === "equilateral" }

    get isScalene() { return this.#triangleType === "scalene" }
}
