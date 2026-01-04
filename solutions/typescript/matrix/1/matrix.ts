export class Matrix {
    private matrixRowArray : number[][]
    private matrixColumnArray : number[][]
    
    constructor(matrixString : string) {
        this.matrixRowArray = matrixString.split('\n')
                                .map((row) => row.split(" ")
                                    .map((value) => parseInt(value,10)
                                    )
                                )
        
        this.matrixColumnArray = []
        const matrixRowsAmount = this.matrixRowArray.length
        const matrixColumnsAmount = this.matrixRowArray[0].length
        const matrixRowIndexArray = [...Array(matrixRowsAmount).keys()]

        for (let columnIndex = 0; columnIndex < matrixColumnsAmount; columnIndex++) {
            let currentColumnArray = []
            
            for (const index of matrixRowIndexArray) {
                currentColumnArray.push(this.matrixRowArray[index][columnIndex])
            }
            
            this.matrixColumnArray.push(currentColumnArray)
        }
    }

    get rows(): number[][] {
        return this.matrixRowArray
    }

    get columns(): number[][] {
        return this.matrixColumnArray
    }
}
