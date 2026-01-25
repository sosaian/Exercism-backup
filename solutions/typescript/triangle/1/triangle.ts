export class Triangle {
    readonly #equilateralTriangle: boolean
    readonly #isoscelesTriangle: boolean
    readonly #scaleneTriangle: boolean
    
    #isTriangle(...sides: [number, number, number]): boolean {
        return (
            sides[0] > 0 &&
            sides[1] > 0 &&
            sides[2] > 0 &&
            sides[0] + sides[1] >= sides[2] &&
            sides[1] + sides[2] >= sides[0] &&
            sides[0] + sides[2] >= sides[1]
        ) 
    }

    #computeTriangleType(...sides: [number, number, number]): string {
        if (sides[0] === sides[1] && sides[1] === sides[2]) { return "equilateral" }
        else if (sides[0] === sides[1] || sides[1] === sides[2] || sides[0] === sides[2]) { return "isosceles" }
        return "scalene"
    }

    constructor(...sides: [number, number, number]) {        
        if (!this.#isTriangle(...sides)) {
            this.#equilateralTriangle = false
            this.#isoscelesTriangle = false
            this.#scaleneTriangle = false
            return
        }

        const triangleType = this.#computeTriangleType(...sides)
        
        if (triangleType === "equilateral") {
            this.#equilateralTriangle = true
            this.#isoscelesTriangle = true // An isosceles triangle has AT LEAST two sides the same length.
            this.#scaleneTriangle = false
            return
        }
        
        if (triangleType === "isosceles") {
            this.#equilateralTriangle = false
            this.#isoscelesTriangle = true
            this.#scaleneTriangle = false
            return
        }

        // Scalene triangle
        this.#equilateralTriangle = false
        this.#isoscelesTriangle = false
        this.#scaleneTriangle = true
    }

    get isEquilateral() { return this.#equilateralTriangle }

    get isIsosceles() { return this.#isoscelesTriangle }

    get isScalene() { return this.#scaleneTriangle }
}
