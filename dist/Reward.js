/**
 * Represents a reward in the game.
 */
export class Reward {
    rewardAmount;
    preconditions;
    rewardCallback;
    /**
     * Creates a new Reward instance.
     * @param rewardAmount The amount of the reward.
     * @param rewardCallback The callback function to be executed when the reward is granted.
     */
    constructor(rewardAmount, rewardCallback) {
        this.rewardAmount = rewardAmount;
        this.rewardCallback = rewardCallback;
        this.preconditions = [];
    }
    /**
     * Adds a precondition for the reward.
     * @param precondition The precondition to be added.
     */
    addPrecondition(precondition) {
        this.preconditions.push(precondition);
    }
    /**
     * Updates the reward based on the elapsed time.
     * @param deltaTime The elapsed time since the last update.
     */
    update(deltaTime) {
        // Check if all preconditions are met
        let rewardGranted = this.preconditions.every((precondition) => {
            precondition.update(deltaTime);
            return precondition.check();
        });
        if (rewardGranted) {
            this.execute();
        }
    }
    /**
     * Executes the reward by invoking the reward callback and logging the reward amount.
     */
    execute() {
        this.rewardCallback();
        console.log(`Reward given: ${this.rewardAmount}`);
    }
}
