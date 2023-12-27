/**
 * Creates a precondition for applying a punishment based on a reward threshold.
 * @param thresholdCheck A callback function that checks if the reward threshold is exceeded.
 * @param countdown The time to wait before applying the punishment.
 * @returns The punishment precondition object.
 */
/**
 * Creates a threshold punishment precondition.
 * @param thresholdCheck A function that checks if the threshold condition is met.
 * @param countdown The countdown duration for the punishment.
 * @returns The punishment precondition object.
 */
export function createThresholdPunishmentPrecondition(thresholdCheck, countdown) {
    let timeLeftForPunishment = countdown;
    let punishmentActivated = false;
    return {
        /**
         * Updates the punishment precondition.
         * @param deltaTime The time elapsed since the last update.
         */
        update: (deltaTime) => {
            if (thresholdCheck() && !punishmentActivated) {
                timeLeftForPunishment -= deltaTime;
                if (timeLeftForPunishment <= 0) {
                    punishmentActivated = true;
                    timeLeftForPunishment = countdown; // Reset for next time
                }
            }
        },
        /**
         * Checks if the punishment condition is met.
         * @returns True if the punishment condition is met, false otherwise.
         */
        check: () => {
            if (punishmentActivated) {
                punishmentActivated = false; // Reset for the next check
                return true; // Punishment condition met
            }
            return false;
        },
        /**
         * Gets the time left for the punishment.
         * @returns The time left for the punishment.
         */
        getTimeLeftForPunishment: () => {
            return timeLeftForPunishment;
        },
        /**
         * Resets the punishment countdown.
         */
        reset: () => {
            timeLeftForPunishment = countdown;
            punishmentActivated = false;
        },
    };
}
