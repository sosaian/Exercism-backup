export class Matrix {
    private matrixRowArray : number[][]
    private matrixColumnArray : number[][] = []
    
    constructor(matrixString : string) {
        this.matrixRowArray = matrixString.split(/\n/)
                                .map((row) => row.split(/\s+/)
                                    .map((value) => parseInt(value,10)
                                    )
                                )
    }

    get rows(): readonly (readonly number[])[] {
        return this.matrixRowArray
    }

    get columns(): readonly (readonly number[])[] {
        const matrixRowsAmount = this.matrixRowArray.length
        const matrixColumnsAmount = this.matrixRowArray[0].length

        for (let columnIndex = 0; columnIndex < matrixColumnsAmount; columnIndex++) {
            let currentColumnArray = []

            for (let index = 0; index < matrixRowsAmount; index++) {
                currentColumnArray.push(this.matrixRowArray[index][columnIndex])
            }
            
            this.matrixColumnArray.push(currentColumnArray)
        }
        
        return this.matrixColumnArray
    }
}
