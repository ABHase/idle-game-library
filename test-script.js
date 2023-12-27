import { GameLoop } from "./dist/GameLoop.js";
import { Reward } from "./dist/Reward.js";
import {
  createFixedRatioPrecondition,
  createFixedIntervalPrecondition,
  createVariableIntervalPrecondition,
  createVariableRatioPrecondition,
} from "./dist/RewardPrecondition.js";

import { Punishment } from "./dist/Punishment.js";

import { createThresholdPunishmentPrecondition } from "./dist/PunishmentPrecondition.js";

import { GameActionComposite } from "./dist/GameActionsComposite.js";

import { GameModifierComposite } from "./dist/GameModifierComposite.js";

document.addEventListener("DOMContentLoaded", () => {
  const fixedRatioDisplay = document.getElementById("fixed-ratio-display");
  const variableRatioDisplay = document.getElementById(
    "variable-ratio-display"
  );
  const fixedIntervalDisplay = document.getElementById(
    "fixed-interval-display"
  );
  const variableIntervalDisplay = document.getElementById(
    "variable-interval-display"
  );

  const punishmentDisplay = document.getElementById("punishment-display");

  const gameLoop = new GameLoop();
  gameLoop.start(200); // 1 second interval

  let doublePointsActive = false;

  let points = 0; // Shared points variable
  const pointsDisplay = document.getElementById("points-display"); // Display for points

  // Function to modify points
  const modifyPoints = (amount) => {
    if (doublePointsActive) {
      points += amount * 2;
    } else {
      points += amount;
    }
  };

  // Function to update the display, called by the game loop
  const updatePointsDisplay = () => {
    pointsDisplay.textContent = `Points: ${points}`;
  };

  gameLoop.registerUpdateCallback(updatePointsDisplay);

  // Fixed Ratio
  const fixedRatioReward = new Reward(10, () => {
    modifyPoints(10);
  });
  fixedRatioReward.addPrecondition(createFixedRatioPrecondition(5));
  document.getElementById("fixed-ratio-btn").addEventListener("click", () => {
    fixedRatioReward.update(1);
  });

  // Variable Ratio
  const variableRatioReward = new Reward(15, () => {
    modifyPoints(15);
  });
  variableRatioReward.addPrecondition(createVariableRatioPrecondition(0.2));
  document
    .getElementById("variable-ratio-btn")
    .addEventListener("click", () => {
      variableRatioReward.update(1);
    });

  // Fixed Interval
  let fixedIntervalTimer = 0;
  const fixedIntervalReward = new Reward(20, () => {
    modifyPoints(20);
  });
  fixedIntervalReward.addPrecondition(createFixedIntervalPrecondition(5000)); // 5 seconds
  document
    .getElementById("fixed-interval-btn")
    .addEventListener("click", () => {
      fixedIntervalTimer = 5;
      const intervalId = setInterval(() => {
        fixedIntervalReward.update(1000);
        fixedIntervalDisplay.textContent = `Time until reward: ${fixedIntervalTimer--} seconds`;
        if (fixedIntervalTimer < 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    });

  // Variable Interval
  let variableIntervalTimer = 0;
  const variableIntervalReward = new Reward(25, () => {
    modifyPoints(25);
  });
  variableIntervalReward.addPrecondition(
    createVariableIntervalPrecondition(5000, 15000)
  ); // Between 5 and 15 seconds
  document
    .getElementById("variable-interval-btn")
    .addEventListener("click", () => {
      variableIntervalTimer = Math.floor(Math.random() * 10) + 5; // Random time between 5 and 15 seconds
      const intervalId = setInterval(() => {
        variableIntervalReward.update(1000);
        variableIntervalDisplay.textContent = `Time until potential reward: ${variableIntervalTimer--} seconds`;
        if (variableIntervalTimer < 0) {
          clearInterval(intervalId);
        }
      }, 1000);
    });

  // Punishment Logic

  document.getElementById("punishment-btn").addEventListener("click", () => {
    // Reset the punishment precondition
    punishmentPrecondition.reset();
  });

  const punishment = new Punishment("10 points deduction", () => {
    modifyPoints(-10); // Deduct 10 points
  });

  const thresholdCheck = () => {
    const isThresholdExceeded = points > 50;
    return isThresholdExceeded;
  };

  // Create the punishment precondition
  let punishmentPrecondition = createThresholdPunishmentPrecondition(
    thresholdCheck,
    5000
  );

  // Add the precondition to the punishment
  punishment.addPrecondition(punishmentPrecondition);

  // Register a callback in the game loop for continuous punishment check
  gameLoop.registerUpdateCallback(() => {
    punishment.update(200); // Call update method of punishment at each interval

    // Update the countdown display only if the threshold is exceeded
    if (thresholdCheck()) {
      const timeLeft = Math.ceil(
        punishmentPrecondition.getTimeLeftForPunishment() / 1000
      );
      punishmentDisplay.textContent = `Time until Punishment of 10 Points: ${timeLeft} seconds`;
    }
  });

  // Sample GameAction classes
  class LogAction {
    constructor(message) {
      this.message = message;
    }

    update(deltaTime) {
      // Update logic if needed
    }

    execute() {
      console.log(this.message);
    }
  }

  class ModifyPointsAction {
    constructor(amount) {
      this.amount = amount;
    }

    update(deltaTime) {
      // Update logic if needed
    }

    execute() {
      modifyPoints(this.amount);
    }
  }

  // Create instances of actions
  const logAction = new LogAction("Executing Log Action!");
  const modifyPointsAction = new ModifyPointsAction(5);

  // Create a GameActionComposite instance and add actions to it
  const gameActionComposite = new GameActionComposite();
  gameActionComposite.add(logAction);
  gameActionComposite.add(modifyPointsAction);

  // Execute actions on button click, for example
  document
    .getElementById("execute-actions-btn")
    .addEventListener("click", () => {
      gameActionComposite.execute();
    });

  class DoublePointsModifier {
    constructor(duration) {
      this.duration = duration;
      this.remainingTime = duration;
    }

    update(deltaTime) {
      console.log(`Modifier Update - Remaining Time: ${this.remainingTime}`);
      this.remainingTime -= deltaTime;
    }

    shouldApply() {
      const apply = this.remainingTime > 0;
      console.log(
        `Should Apply Modifier: ${apply}, Remaining Time: ${this.remainingTime}`
      );
      return apply;
    }

    cleanup() {
      // Reset the flag or any other necessary cleanup
      doublePointsActive = false;
      console.log("Double Points Modifier cleaned up.");
    }

    apply() {
      console.log(`Applying Modifier - Remaining Time: ${this.remainingTime}`);
      if (this.shouldApply()) {
        doublePointsActive = true;
        console.log("Modifier Applied: Double Points Active");
      } else {
        doublePointsActive = false;
        console.log("Modifier Expired: Double Points Deactivated");
      }
    }
  }

  const modifierComposite = new GameModifierComposite();

  // Update and apply composite modifiers in the game loop
  gameLoop.registerUpdateCallback(() => {
    const deltaTime = 200; // Assuming 200 ms per game loop tick
    modifierComposite.update(deltaTime);
    modifierComposite.apply();
  });

  // Example: Triggering a modifier on a button click
  document
    .getElementById("trigger-modifier-btn")
    .addEventListener("click", () => {
      console.log("Adding Double Points Modifier");
      // Create and add a new instance of the modifier only when the button is clicked
      const newDoublePoints = new DoublePointsModifier(10000); // 10 seconds
      modifierComposite.addModifier(newDoublePoints);
    });

  // Initialize points display
  modifyPoints(0);
});
