/**
 * Represents a punishment in the game.
 */
export class Punishment {
    punishmentSeverity;
    preconditions;
    punishmentCallback;
    /**
     * Creates a new instance of the Punishment class.
     * @param punishmentSeverity The severity of the punishment.
     * @param punishmentCallback The callback function to be executed when the punishment is applied.
     */
    constructor(punishmentSeverity, punishmentCallback) {
        this.punishmentSeverity = punishmentSeverity;
        this.punishmentCallback = punishmentCallback;
        this.preconditions = []; // Initialize the preconditions array
    }
    /**
     * Adds a precondition to the punishment.
     * @param precondition The precondition to be added.
     */
    addPrecondition(precondition) {
        this.preconditions.push(precondition);
    }
    /**
     * Updates the punishment based on the elapsed time.
     * @param deltaTime The time elapsed since the last update.
     */
    update(deltaTime) {
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
    execute() {
        this.punishmentCallback();
        console.log(`Punishment applied: ${this.punishmentSeverity}`);
    }
}
