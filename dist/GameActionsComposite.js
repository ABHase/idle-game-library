/**
 * Represents a composite game action that contains multiple game actions.
 */
export class GameActionComposite {
    actions = [];
    /**
     * Adds a game action to the composite.
     * @param action The game action to add.
     */
    add(action) {
        this.actions.push(action);
    }
    /**
     * Removes a game action from the composite.
     * @param action The game action to remove.
     */
    remove(action) {
        const index = this.actions.indexOf(action);
        if (index !== -1) {
            this.actions.splice(index, 1);
        }
    }
    /**
     * Updates all the game actions in the composite.
     * @param deltaTime The time elapsed since the last update.
     */
    update(deltaTime) {
        this.actions.forEach((action) => action.update(deltaTime));
    }
    /**
     * Executes all the game actions in the composite.
     */
    execute() {
        this.actions.forEach((action) => action.execute());
    }
}
