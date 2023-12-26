export class Reward {
    rewardAmount;
    preconditions;
    rewardCallback;
    constructor(rewardAmount, rewardCallback) {
        this.rewardAmount = rewardAmount;
        this.rewardCallback = rewardCallback;
        this.preconditions = [];
    }
    addPrecondition(precondition) {
        this.preconditions.push(precondition);
    }
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
    execute() {
        this.rewardCallback();
        console.log(`Reward given: ${this.rewardAmount}`);
    }
}
