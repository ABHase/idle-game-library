/**
 * Represents a game modifier that can update, apply, and determine if it should be applied.
 */
export interface GameModifier {
  /**
   * Updates the game modifier based on the elapsed time.
   * @param deltaTime The elapsed time since the last update.
   */
  update(deltaTime: number): void;

  /**
   * Applies the game modifier to the game.
   */
  apply(): void;

  /**
   * Determines whether the game modifier should be applied.
   * @returns True if the game modifier should be applied, false otherwise.
   */
  shouldApply(): boolean;
}
export interface GameModifier {
  update(deltaTime: number): void;
  apply(): void;
  shouldApply(): boolean;
  cleanup(): void;
}

export interface ModifierCondition {
  check: () => boolean;
  update: (deltaTime: number) => void;
}
