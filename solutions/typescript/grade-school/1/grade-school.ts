export class GradeSchool {
    #studentRoster: Map<number,string[]> = new Map()
    
    public roster() { 
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
        newStudentGrade.sort()

        this.#studentRoster.set(studentGrade, newStudentGrade)
    }

    public grade(gradeNumber: number): string[] {
        if (gradeNumber < 1) { throw new Error('Invalid grade number.') }
        
        let roster = this.#studentRoster.get(gradeNumber)

        return roster ? [...roster] : []
    }
}
