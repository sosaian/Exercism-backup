export class DnDCharacter {
    public static generateAbilityScore(): number {
        let sum = 0
        const DICE_ROLL_ONE = 1 + Math.floor(Math.random() * 6)
        sum += DICE_ROLL_ONE
        let min = DICE_ROLL_ONE
        const DICE_ROLL_TWO = 1 + Math.floor(Math.random() * 6)
        sum += DICE_ROLL_TWO
        min = min > DICE_ROLL_TWO ? DICE_ROLL_TWO : min
        const DICE_ROLL_THREE = 1 + Math.floor(Math.random() * 6)
        sum += DICE_ROLL_THREE
        min = min > DICE_ROLL_THREE ? DICE_ROLL_THREE : min
        const DICE_ROLL_FOUR = 1 + Math.floor(Math.random() * 6)
        min = min > DICE_ROLL_FOUR ? DICE_ROLL_FOUR : min
        return sum - min
    }

    public static getModifierFor(abilityValue: number): number {
        return Math.floor((abilityValue - 10) / 2)
    }

    public strength = DnDCharacter.generateAbilityScore()
    public dexterity = DnDCharacter.generateAbilityScore()
    public constitution = DnDCharacter.generateAbilityScore()
    public intelligence = DnDCharacter.generateAbilityScore()
    public wisdom = DnDCharacter.generateAbilityScore()
    public charisma = DnDCharacter.generateAbilityScore()
    
    public hitpoints = 10 + DnDCharacter.getModifierFor(this.constitution)
}
