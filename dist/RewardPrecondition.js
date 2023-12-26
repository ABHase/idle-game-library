/**
 * Creates a fixed interval precondition for rewards.
 * @param interval The interval in milliseconds.
 * @returns The reward precondition object.
 */
export function createFixedIntervalPrecondition(interval) {
    let elapsed = 0;
    return {
        update: (deltaTime, timeStep = 1) => {
            elapsed += deltaTime * timeStep;
        },
        check: () => {
            if (elapsed >= interval) {
                elapsed = 0;
                return true;
            }
            return false;
        },
    };
}
/**
 * Creates a fixed ratio precondition for a reward.
 * @param actionsRequired The number of actions required to fulfill the precondition.
 * @returns The reward precondition object.
 */
export function createFixedRatioPrecondition(actionsRequired) {
    let count = 0;
    return {
        update: (timeStep = 1) => {
            count += timeStep;
        },
        check: () => {
            if (count >= actionsRequired) {
                count -= actionsRequired;
                return true;
            }
            return false;
        },
    };
}
/**
 * Creates a variable ratio precondition for a reward.
 * @param chance The chance of the precondition being met.
 * @returns The created RewardPrecondition object.
 */
export function createVariableRatioPrecondition(chance) {
    return {
        update: (timeStep = 1) => {
            // No-op, or potentially track timeStep if needed for future logic
        },
        check: () => {
            return Math.random() < chance;
        },
    };
}
/**
 * Creates a variable interval precondition for rewards.
 * @param minInterval The minimum interval in milliseconds.
 * @param maxInterval The maximum interval in milliseconds.
 * @returns The created RewardPrecondition object.
 */
export function createVariableIntervalPrecondition(minInterval, maxInterval) {
    let elapsed = 0;
    let nextInterval = Math.random() * (maxInterval - minInterval) + minInterval;
    return {
        update: (deltaTime, timeStep = 1) => {
            elapsed += deltaTime * timeStep;
        },
        check: () => {
            if (elapsed >= nextInterval) {
                elapsed = 0;
                nextInterval =
                    Math.random() * (maxInterval - minInterval) + minInterval; // Set the next interval
                return true;
            }
            return false;
        },
    };
}
