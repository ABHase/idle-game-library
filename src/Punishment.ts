import { GameAction } from "./GameAction";
import { PunishmentPrecondition } from "./PunishmentPrecondition";

/**
 * Represents a punishment in the game.
 */
export class Punishment implements GameAction {
  private punishmentSeverity: number;
  private preconditions: PunishmentPrecondition[];
  private punishmentCallback: () => void;

  /**
   * Creates a new instance of the Punishment class.
   * @param punishmentSeverity The severity of the punishment.
   * @param punishmentCallback The callback function to be executed when the punishment is applied.
   */
  constructor(punishmentSeverity: number, punishmentCallback: () => void) {
    this.punishmentSeverity = punishmentSeverity;
    this.punishmentCallback = punishmentCallback;
    this.preconditions = []; // Initialize the preconditions array
  }

  /**
   * Adds a precondition to the punishment.
   * @param precondition The precondition to be added.
   */
  addPrecondition(precondition: PunishmentPrecondition): void {
    this.preconditions.push(precondition);
  }

  /**
   * Updates the punishment based on the elapsed time.
   * @param deltaTime The time elapsed since the last update.
   */
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

  /**
   * Executes the punishment.
   */
  execute(): void {
    this.punishmentCallback();
    console.log(`Punishment applied: ${this.punishmentSeverity}`);
  }
}
