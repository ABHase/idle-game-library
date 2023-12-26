/**
 * Represents a game loop that executes update callbacks at a specified interval.
 */
export class GameLoop {
  private intervalId: NodeJS.Timeout | null = null;
  private updateCallbacks: (() => void)[] = [];

  /**
   * Starts the game loop with the specified interval.
   * @param interval The interval in milliseconds at which the update callbacks should be executed.
   */
  start(interval: number): void {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => {
        this.updateCallbacks.forEach((callback) => callback());
      }, interval);
    }
  }

  /**
   * Stops the game loop.
   */
  stop(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  /**
   * Registers an update callback function to be executed in the game loop.
   * @param callback The callback function to be registered.
   */
  registerUpdateCallback(callback: () => void): void {
    this.updateCallbacks.push(callback);
  }
}
