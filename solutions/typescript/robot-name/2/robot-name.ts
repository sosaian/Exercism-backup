const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'

const ROBOT_NAME_LIST_MAX_LENGTH =
    26 * // A-Z
    26 * // A-Z
    10 * // 0-9
    10 * // 0-9
    10   // 0-9

const NAME_POOL_EXHAUSTED_ERROR_MESSAGE = 'Name pool exhausted. Can not create a new unique robot name.'

export class Robot {
    static #robotNameList: Set<string> = new Set()
    #robotName: string = ''

    static #randomLetter(): string { return LETTERS[Math.floor(Math.random() * LETTERS.length)] }
    
    static #randomNumber(): string { return NUMBERS[Math.floor(Math.random() * NUMBERS.length)] }
    
    private static randomRobotName(): string {
        const firstLetter = Robot.#randomLetter()
        const secondLetter = Robot.#randomLetter()
        const firstNumber = Robot.#randomNumber()
        const secondNumber = Robot.#randomNumber()
        const thirdNumber = Robot.#randomNumber()

        return firstLetter + secondLetter + firstNumber + secondNumber + thirdNumber
    }

    static #setRobotName(): string {
        if (Robot.#robotNameList.size >= ROBOT_NAME_LIST_MAX_LENGTH) throw new Error(NAME_POOL_EXHAUSTED_ERROR_MESSAGE)

        let potentialRobotName: string
        
        do {
            potentialRobotName = Robot.randomRobotName()
        } while (Robot.#robotNameList.has(potentialRobotName))
        
        Robot.#robotNameList.add(potentialRobotName)
        return potentialRobotName
    }

    constructor() { this.#robotName = Robot.#setRobotName() }

    public get name(): string { return this.#robotName }

    public resetName(): void { this.#robotName = Robot.#setRobotName() }

    public static releaseNames(): void { Robot.#robotNameList.clear() }
}
