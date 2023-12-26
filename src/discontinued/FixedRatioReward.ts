/**
 * Represents a fixed ratio reward system.
 */
export class FixedRatioReward {
  private count: number = 0;
  private actionsRequired: number;
  private reward: number;

  /**
   * Creates a new instance of FixedRatioReward.
   * @param actionsRequired The number of actions required to earn the reward.
   * @param reward The reward to be earned.
   */
  constructor(actionsRequired: number, reward: number) {
    this.actionsRequired = actionsRequired;
    this.reward = reward;
  }

  /**
   * Performs an action, considering the time step, and returns the earned reward if the required number of actions is reached.
   * @param timeStep The multiplier for the action, defaulting to 1.
   * @returns The earned reward, or 0 if the required number of actions is not reached yet.
   */
  performAction(timeStep: number = 1, epsilon: number = 0.0001): number {
    this.count += timeStep;
    if (this.count + epsilon >= this.actionsRequired) {
      this.count = 0; // Reset the count
      return this.reward; // Return the reward
    }
    return 0; // No reward yet
  }

  /**
   * Updates the parameters of the reward system.
   * @param actionsRequired The new number of actions required to earn the reward.
   * @param reward The new reward to be earned.
   */
  updateParameters(actionsRequired: number, reward: number): void {
    this.actionsRequired = actionsRequired;
    this.reward = reward;
  }

  /**
   * Resets the count of performed actions to zero.
   */
  resetCount(): void {
    this.count = 0;
  }
}
