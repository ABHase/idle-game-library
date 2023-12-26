/**
 * Represents a variable ratio reward system.
 */
export class VariableRatioReward {
    chance;
    reward;
    /**
     * Creates a new instance of the VariableRatioReward class.
     * @param chance The chance of receiving a reward.
     * @param reward The amount of reward to be given.
     */
    constructor(chance, reward) {
        this.chance = chance;
        this.reward = reward;
    }
    /**
     * Performs an action and returns the reward based on the chance and time step.
     * @param timeStep The time step used to adjust the chance.
     * @returns The reward if the adjusted random chance is met, otherwise 0.
     */
    performAction(timeStep = 1) {
        if (Math.random() < this.chance * timeStep) {
            return this.reward;
        }
        return 0;
    }
    /**
     * Updates the chance and reward parameters of the reward system.
     * @param chance The new chance value.
     * @param reward The new reward value.
     */
    updateParameters(chance, reward) {
        this.chance = chance;
        this.reward = reward;
    }
}
