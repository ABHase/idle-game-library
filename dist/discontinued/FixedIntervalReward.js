/**
 * Represents a fixed interval reward system.
 */
export class FixedIntervalReward {
    interval;
    reward;
    intervalId = null;
    rewardCallback;
    /**
     * Creates a new instance of FixedIntervalReward.
     * @param interval The interval in seconds between rewards.
     * @param reward The reward amount.
     * @param rewardCallback The callback function to be invoked when a reward is given.
     */
    constructor(interval, reward, rewardCallback) {
        this.interval = interval;
        this.reward = reward;
        this.rewardCallback = rewardCallback;
    }
    /**
     * Starts the reward system.
     */
    start() {
        if (this.intervalId === null) {
            this.intervalId = setInterval(() => {
                // Invoke the callback with the reward
                this.rewardCallback(this.reward);
            }, this.interval * 1000);
        }
    }
    /**
     * Stops the reward system.
     */
    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
    /**
     * Updates the interval and reward parameters of the reward system.
     * @param interval The new interval in seconds between rewards.
     * @param reward The new reward amount.
     */
    updateParameters(interval, reward) {
        this.interval = interval;
        this.reward = reward;
        if (this.intervalId !== null) {
            this.stop();
            this.start();
        }
    }
}
