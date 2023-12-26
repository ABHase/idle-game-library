import { GameAction } from "./GameAction";

export class GameActionComposite implements GameAction {
  private actions: GameAction[] = [];

  add(action: GameAction): void {
    this.actions.push(action);
  }

  remove(action: GameAction): void {
    const index = this.actions.indexOf(action);
    if (index !== -1) {
      this.actions.splice(index, 1);
    }
  }

  update(deltaTime: number): void {
    this.actions.forEach((action) => action.update(deltaTime));
  }

  execute(): void {
    this.actions.forEach((action) => action.execute());
  }
}
