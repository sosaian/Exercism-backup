export class GradeSchool {
    #studentRoster: Map<number,string[]> = new Map()
    
    public roster() { 
        const rosterObject: Record<number, string[]> = {}

        const sortedGrades = [...this.#studentRoster.keys()].sort((a, b) => a - b)

        for (const grade of sortedGrades) {
            const studentList = this.#studentRoster.get(grade) ?? []
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
        if (studentName.length === 0) { throw new Error('Invalid student name.') }

        if (studentGrade < 1) { throw new Error('Invalid student grade.') }

        this.#removeIfAlreadyStudent(studentName)

        let newStudentGrade = this.grade(studentGrade)
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
