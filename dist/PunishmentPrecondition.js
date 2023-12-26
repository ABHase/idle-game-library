// PunishmentPrecondition.ts
/**
 * Creates a precondition for applying a punishment based on a reward threshold.
 * @param thresholdCheck A callback function that checks if the reward threshold is exceeded.
 * @param countdown The time to wait before applying the punishment.
 * @returns The punishment precondition object.
 */
export function createThresholdPunishmentPrecondition(thresholdCheck, countdown) {
    let timeLeftForPunishment = countdown;
    let punishmentActivated = false;
    return {
        update: (deltaTime) => {
            if (thresholdCheck() && !punishmentActivated) {
                timeLeftForPunishment -= deltaTime;
                if (timeLeftForPunishment <= 0) {
                    punishmentActivated = true;
                    timeLeftForPunishment = countdown; // Reset for next time
                }
            }
        },
        check: () => {
            if (punishmentActivated) {
                punishmentActivated = false; // Reset for the next check
                return true; // Punishment condition met
            }
            return false;
        },
    };
}
