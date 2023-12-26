import { GameLoop } from "./src/GameLoop";
import { Reward } from "./src/Reward";
import { Punishment } from "./src/Punishment";
import { GameActionComposite } from "./src/GameActionsComposite";

// Mock for Reward and Punishment callbacks
const mockRewardCallback = jest.fn();
const mockPunishmentCallback = jest.fn();

// Create instances of Reward and Punishment
const reward = new Reward(10, mockRewardCallback);
const punishment = new Punishment(5, mockPunishmentCallback);

// Set up preconditions if they are part of your Reward and Punishment
// For example, a fixed interval reward precondition:
const fixedIntervalPrecondition = {
  update: jest.fn(),
  check: jest.fn(() => true), // Always returns true for the test
};
reward.addPrecondition(fixedIntervalPrecondition);

// Assume a similar setup for punishment precondition if necessary

// Set up the GameActionComposite
const gameActions = new GameActionComposite();
gameActions.add(reward);
gameActions.add(punishment);

// Set up the GameLoop
const gameLoop = new GameLoop();
gameLoop.registerUpdateCallback(() => gameActions.update(100)); // Example deltaTime

describe("GameLoop with GameActions", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockRewardCallback.mockClear();
    mockPunishmentCallback.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should call reward and punishment callbacks when conditions are met", () => {
    // Start the game loop
    gameLoop.start(100); // Run every 100ms for the test

    // Fast-forward time to trigger the interval callback
    jest.advanceTimersByTime(100);

    // Check if the reward and punishment callbacks have been called
    expect(mockRewardCallback).toHaveBeenCalled();
    expect(mockPunishmentCallback).toHaveBeenCalled();
  });

  it("should not call callbacks when preconditions are not met", () => {
    // Adjust the precondition mock to return false
    fixedIntervalPrecondition.check.mockReturnValue(false);

    // Start the game loop
    gameLoop.start(100); // Run every 100ms for the test

    // Fast-forward time to trigger the interval callback
    jest.advanceTimersByTime(100);

    // Check that the callbacks have not been called
    expect(mockRewardCallback).not.toHaveBeenCalled();
    expect(mockPunishmentCallback).not.toHaveBeenCalled();
  });

  // ... additional tests as needed
});
