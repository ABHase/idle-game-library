export class Punishment {
    punishmentSeverity;
    preconditions;
    punishmentCallback;
    constructor(punishmentSeverity, punishmentCallback) {
        this.punishmentSeverity = punishmentSeverity;
        this.punishmentCallback = punishmentCallback;
        this.preconditions = []; // Initialize the preconditions array
    }
    addPrecondition(precondition) {
        this.preconditions.push(precondition);
    }
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
    execute() {
        this.punishmentCallback();
        console.log(`Punishment applied: ${this.punishmentSeverity}`);
    }
}
