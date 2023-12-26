// GameModifier.ts

export interface GameModifier {
  update(deltaTime: number): void;
  apply(): void;
  shouldApply(): boolean; // New method
}

export interface ModifierCondition {
  check: () => boolean;
  update: (deltaTime: number) => void;
}
