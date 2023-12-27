/**
 * Represents a game action that can be updated and executed.
 */
export interface GameAction {
  /**
   * Updates the game action based on the elapsed time.
   * @param deltaTime The elapsed time since the last update.
   */
  update(deltaTime: number): void;

  /**
   * Executes the game action.
   */
  execute(): void;
}
