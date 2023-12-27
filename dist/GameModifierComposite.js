/**
 * Represents a composite game modifier that applies a collection of individual game modifiers.
 */
export class GameModifierComposite {
    shouldApplyCondition = () => true;
    modifiers = [];
    /**
     * Updates the composite game modifier.
     * @param deltaTime - The time elapsed since the last update.
     */
    update(deltaTime) {
        this.modifiers.forEach((modifier) => modifier.update(deltaTime));
        this.apply();
        this.cleanup();
    }
    /**
     * Sets the condition for applying the composite game modifier.
     * @param condition - The condition function that determines whether the modifier should be applied.
     */
    setShouldApplyCondition(condition) {
        this.shouldApplyCondition = condition;
    }
    /**
     * Checks if the composite game modifier should be applied.
     * @returns A boolean indicating whether the modifier should be applied.
     */
    shouldApply() {
        return this.shouldApplyCondition();
    }
    /**
     * Applies the composite game modifier.
     */
    apply() {
        this.modifiers.forEach((modifier) => {
            if (this.shouldApplyCondition() && modifier.shouldApply()) {
                modifier.apply();
            }
        });
    }
    /**
     * Cleans up expired modifiers.
     */
    cleanup() {
        const expiredModifiers = this.modifiers.filter((modifier) => !modifier.shouldApply());
        expiredModifiers.forEach((modifier) => {
            // Call a cleanup method on the modifier if it exists
            if (typeof modifier.cleanup === "function") {
                modifier.cleanup();
            }
        });
        // Remove expired modifiers from the array
        this.modifiers = this.modifiers.filter((modifier) => modifier.shouldApply());
    }
    /**
     * Adds an individual game modifier to the composite.
     * @param modifier - The game modifier to add.
     */
    addModifier(modifier) {
        this.modifiers.push(modifier);
    }
    /**
     * Removes an individual game modifier from the composite.
     * @param modifier - The game modifier to remove.
     */
    removeModifier(modifier) {
        const index = this.modifiers.indexOf(modifier);
        if (index > -1) {
            this.modifiers.splice(index, 1);
        }
    }
}
