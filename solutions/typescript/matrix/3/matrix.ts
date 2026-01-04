export class Matrix {
    private readonly matrixRowArray : number[][]
    private readonly matrixColumnArray :  number[][]
    
    constructor(matrixString : string) {
        this.matrixRowArray = matrixString.trim().split(/\n/)
                                .map((row) => row.trim().split(/\s+/)
                                    .map((value) => Number(value))
                                )

        this.matrixColumnArray = this.matrixRowArray[0].map((_, columnIndex) => {
            return this.matrixRowArray.map((row) => row[columnIndex])
        })
    }

    get rows(): readonly (readonly number[])[] {
        return this.matrixRowArray.map(row => [...row])
    }

    get columns(): readonly (readonly number[])[] {        
        return this.matrixColumnArray.map(row => [...row])
    }
}
