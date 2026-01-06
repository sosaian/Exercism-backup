const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lettersAmount = LETTERS.length

const NUMBERS = '0123456789'
const numbersAmount = NUMBERS.length

export class Robot {
    static #robotNameList: Set<string> = new Set()
    #robotName!: string

    static #randomLetter(): string { return LETTERS[Math.floor(Math.random() * lettersAmount)] }
    
    static #randomNumber(): string { return NUMBERS[Math.floor(Math.random() * numbersAmount)] }
    
    private static randomRobotName(): string {
        const firstLetter = Robot.#randomLetter()
        const secondLetter = Robot.#randomLetter()
        const firstNumber = Robot.#randomNumber()
        const secondNumber = Robot.#randomNumber()
        const thirdNumber = Robot.#randomNumber()

        return firstLetter + secondLetter + firstNumber + secondNumber + thirdNumber
    }

    static #setRobotName(): string {
        let potentialRobotName
        
        do {
            potentialRobotName = Robot.randomRobotName()
        } while (Robot.#robotNameList.has(potentialRobotName))
        
        Robot.#robotNameList.add(potentialRobotName)
        return potentialRobotName
    }

    constructor() { this.#robotName = Robot.#setRobotName() }

    public get name(): string {
        if (!this.#robotName) { this.resetName() }
            
        return this.#robotName
    }

    public resetName(): void { this.#robotName = Robot.#setRobotName() }

    public static releaseNames(): void { Robot.#robotNameList.clear() }
}
