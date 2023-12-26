import { GameAction } from "./GameAction";
import { RewardPrecondition } from "./RewardPrecondition";

export class Reward implements GameAction {
  private rewardAmount: number;
  private preconditions: RewardPrecondition[];
  private rewardCallback: () => void;

  constructor(rewardAmount: number, rewardCallback: () => void) {
    this.rewardAmount = rewardAmount;
    this.rewardCallback = rewardCallback;
    this.preconditions = [];
  }

  addPrecondition(precondition: RewardPrecondition): void {
    this.preconditions.push(precondition);
  }

  update(deltaTime: number): void {
    // Check if all preconditions are met
    let rewardGranted = this.preconditions.every((precondition) => {
      precondition.update(deltaTime);
      return precondition.check();
    });

    if (rewardGranted) {
      this.execute();
    }
  }

  execute(): void {
    this.rewardCallback();
    console.log(`Reward given: ${this.rewardAmount}`);
  }
}
