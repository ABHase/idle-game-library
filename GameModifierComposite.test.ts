import { GameModifierComposite } from "./src/GameModifierComposite";
import { GameModifier } from "./src/GameModifier";

describe("GameModifierComposite", () => {
  let composite: GameModifierComposite; // Explicitly typing the variable
  let mockModifier: GameModifier;

  beforeEach(() => {
    composite = new GameModifierComposite();
    mockModifier = {
      update: jest.fn(),
      apply: jest.fn(),
      shouldApply: jest.fn(() => true), // Default to always applying
    };
  });

  test("should update all modifiers", () => {
    composite.addModifier(mockModifier);
    composite.update(100); // Example deltaTime
    expect(mockModifier.update).toHaveBeenCalledWith(100);
  });

  test("should apply modifiers when condition is true", () => {
    composite.addModifier(mockModifier);
    composite.apply();
    expect(mockModifier.apply).toHaveBeenCalled();
  });

  test("should not apply modifiers when condition is false", () => {
    composite.setShouldApplyCondition(() => false);
    composite.addModifier(mockModifier);
    composite.apply();
    expect(mockModifier.apply).not.toHaveBeenCalled();
  });

  test("should add and remove modifiers correctly", () => {
    composite.addModifier(mockModifier);
    expect(() => composite.removeModifier(mockModifier)).not.toThrow();
  });

  // Additional tests as needed...
});
