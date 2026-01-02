export class DnDCharacter {
    public static generateAbilityScore(): number {
        const DICE_ROLLS_AMOUNT = 4
        const DICE_SIDES_AMOUNT = 6

        const diceRollValues = Array.from(
            { length: DICE_ROLLS_AMOUNT},
            () => 1 + Math.floor(Math.random() * DICE_SIDES_AMOUNT)
        )

        const min = Math.min(...diceRollValues)
        
        return diceRollValues.reduce((sum, rollValue) => sum + rollValue, 0) - min
    }

    public static getModifierFor(abilityValue: number): number {
        return Math.floor((abilityValue - 10) / 2)
    }

    public readonly strength = DnDCharacter.generateAbilityScore()
    public readonly dexterity = DnDCharacter.generateAbilityScore()
    public readonly constitution = DnDCharacter.generateAbilityScore()
    public readonly intelligence = DnDCharacter.generateAbilityScore()
    public readonly wisdom = DnDCharacter.generateAbilityScore()
    public readonly charisma = DnDCharacter.generateAbilityScore()

    public get hitpoints() : number { return 10 + DnDCharacter.getModifierFor(this.constitution) }
}
