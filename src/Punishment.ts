import { GameAction } from "./GameAction";
import { PunishmentPrecondition } from "./PunishmentPrecondition";

export class Punishment implements GameAction {
  private punishmentSeverity: number;
  private preconditions: PunishmentPrecondition[];
  private punishmentCallback: () => void;

  constructor(punishmentSeverity: number, punishmentCallback: () => void) {
    this.punishmentSeverity = punishmentSeverity;
    this.punishmentCallback = punishmentCallback;
    this.preconditions = []; // Initialize the preconditions array
  }

  addPrecondition(precondition: PunishmentPrecondition): void {
    this.preconditions.push(precondition);
  }

  update(deltaTime: number): void {
    // Check if all preconditions are met
    let punishmentDue = this.preconditions.every((precondition) => {
      precondition.update(deltaTime);
      return precondition.check();
    });

    if (punishmentDue) {
      this.execute();
    }
  }

  execute(): void {
    this.punishmentCallback();
    console.log(`Punishment applied: ${this.punishmentSeverity}`);
  }
}
