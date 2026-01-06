export class GradeSchool {
    #studentRoster: Map<number,string[]> = new Map()
    
    public roster(): Record<number, string[]> { 
        const rosterObject: Record<number, string[]> = {}

        for (const [grade, studentList] of this.#studentRoster) {
            rosterObject[grade] = [...studentList]
        }

        return rosterObject
    }

    #removeIfAlreadyStudent(studentName: string): void {
        if (this.#studentRoster.size === 0) return

        for (const [grade, studentList] of this.#studentRoster) {
            if (!studentList.includes(studentName)) { continue }

            if (studentList.length === 1) {
                this.#studentRoster.delete(grade)
                return
            }

            this.#studentRoster.set(
                grade,
                studentList.filter((actualStudentName) => {
                    return actualStudentName !== studentName
                })
            )

            break
        }
    }

    public add(studentName: string, studentGrade: number): void {
        if (studentName.trim().length === 0) {
            return
            //throw new Error('Invalid student name.')
        }

        if (!Number.isInteger(studentGrade)) { 
            return
            //throw new Error('Grade needs to be integer.')
        }

        if (studentGrade < 1) {
            return
            //throw new Error('Grade needs to be bigger than zero.')
        }

        this.#removeIfAlreadyStudent(studentName)

        let newStudentGrade = this.#studentRoster.get(studentGrade) ?? []
        newStudentGrade.push(studentName)
        newStudentGrade.sort((a, b) => a.localeCompare(b))

        this.#studentRoster.set(studentGrade, newStudentGrade)
    }

    public grade(gradeNumber: number): string[] {
        if (gradeNumber < 1) { throw new Error('Invalid grade number.') }
        
        let roster = this.#studentRoster.get(gradeNumber)

        return roster ? [...roster] : []
    }
}
