// GameModifierComposite.ts

import { GameModifier } from "./GameModifier";

export class GameModifierComposite implements GameModifier {
  private shouldApplyCondition: () => boolean = () => true;
  private modifiers: GameModifier[] = [];

  update(deltaTime: number): void {
    this.modifiers.forEach((modifier) => modifier.update(deltaTime));
  }

  setShouldApplyCondition(condition: () => boolean): void {
    this.shouldApplyCondition = condition;
  }

  shouldApply(): boolean {
    return this.shouldApplyCondition();
  }

  apply(): void {
    this.modifiers.forEach((modifier) => {
      if (this.shouldApplyCondition() && modifier.shouldApply()) {
        modifier.apply();
      }
    });
  }

  addModifier(modifier: GameModifier): void {
    this.modifiers.push(modifier);
  }

  removeModifier(modifier: GameModifier): void {
    const index = this.modifiers.indexOf(modifier);
    if (index > -1) {
      this.modifiers.splice(index, 1);
    }
  }
}
