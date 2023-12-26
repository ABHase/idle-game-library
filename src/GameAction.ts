export interface GameAction {
  update(deltaTime: number): void;
  execute(): void;
}
