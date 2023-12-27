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

  const gameLoop = new GameLoop();
  gameLoop.start(200); // 1 second interval

  // Example of how to do it with a gameState object
  const gameState = {
    points: 0,
    autoCrafters: 0,
    autoCrafterCrafters: 0,
    autoCrafterCrafterActions: [],
    doublePointsActive: false,
    autoCrafterCrafterCrafters: 0,
    autoCrafterCrafterCrafterActions: [],
  };

  // Register auto-crafting in the game loop
  gameLoop.registerUpdateCallback(() => {
    const deltaTime = 200; // 200 milliseconds per game loop tick

    // Execute auto-crafting
    autoCraftAction.execute(deltaTime);

    // Execute all auto-crafter-crafter actions
    gameState.autoCrafterCrafterActions.forEach((action, index) => {
      console.log(`Executing autoCrafterCrafterAction at index ${index}`);
      action.execute(deltaTime);
    });

    // Execute all auto-crafter-crafter-crafter actions
    gameState.autoCrafterCrafterCrafterActions.forEach((action, index) => {
      console.log(
        `Executing autoCrafterCrafterCrafterAction at index ${index}`
      );
      action.execute(deltaTime);
    });

    // Update displays
    updateAutoCrafterDisplay();
    updateAutoCrafterCrafterDisplay();
    updateAutoCrafterCrafterCrafterDisplay();
    updatePointsDisplay();
  });

  // Display for auto crafters
  const autoCrafterDisplay = document.getElementById("auto-crafter-count");

  // Update auto crafter display function
  const updateAutoCrafterDisplay = () => {
    autoCrafterDisplay.textContent = `Auto Crafters: ${gameState.autoCrafters}`;
  };

  // Update function for auto-crafter-crafter display
  const updateAutoCrafterCrafterDisplay = () => {
    const autoCrafterCrafterDisplay = document.getElementById(
      "auto-crafter-crafter-count"
    );
    autoCrafterCrafterDisplay.textContent = `Auto-Crafter-Crafters: ${gameState.autoCrafterCrafters}`;
  };

  const updateAutoCrafterCrafterCrafterDisplay = () => {
    const autoCrafterCrafterCrafterDisplay = document.getElementById(
      "auto-crafter-crafter-crafter-count"
    );
    autoCrafterCrafterCrafterDisplay.textContent = `AutoCrafter-Crafter-Crafters: ${gameState.autoCrafterCrafterCrafters}`;
  };

  const punishmentDisplay = document.getElementById("punishment-display");

  let doublePointsActive = false;

  //  let points = 0; // Shared points variable
  // let autoCrafters = 0; // Example of a shared variable for making something in game automatically

  const pointsDisplay = document.getElementById("points-display"); // Display for points

  // Function to modify points (how to do it without a gameState object)
  //const modifyPoints = (amount) => {
  // if (doublePointsActive) {
  //   points += amount * 2;
  // } else {
  //  points += amount;
  // }
  // };

  // Function to modify points (how to do it with a gameState object)
  const modifyPoints = (amount) => {
    if (gameState.doublePointsActive) {
      gameState.points += amount * 2;
    } else {
      gameState.points += amount;
    }
  };

  // Function to update the display, called by the game loop
  const updatePointsDisplay = () => {
    pointsDisplay.textContent = `Points: ${gameState.points}`;
  };

  // Register the update callback in the game loop
  gameLoop.registerUpdateCallback(updatePointsDisplay);

  // Create a reward for generating points
  const pointReward = new Reward(1, () => {
    points++; // Increase points by 1
  });

  // Add a fixed interval precondition for the point reward
  pointReward.addPrecondition(createFixedIntervalPrecondition(5000)); // Every 5 seconds

  // Create an auto-crafter purchase action
  // Purchase Auto Crafter Action
  class PurchaseAutoCrafterAction {
    constructor(cost) {
      this.cost = cost;
    }
    execute() {
      if (gameState.points >= this.cost) {
        gameState.points -= this.cost;
        gameState.autoCrafters++;
        console.log("Auto-crafter purchased!");
        updateAutoCrafterDisplay(); // Update the display
      } else {
        console.log("Not enough points to purchase auto-crafter.");
      }
    }
  }

  // Instantiate purchase action
  const purchaseAutoCrafter = new PurchaseAutoCrafterAction(50); // Cost of each auto-crafter

  // Add a button event listener to purchase auto-crafters
  document
    .getElementById("purchase-auto-crafter-btn")
    .addEventListener("click", () => {
      purchaseAutoCrafter.execute();
    });

  // Create an action composite for auto-crafting
  const autoCraftingAction = new GameActionComposite();

  // Adjust the AutoCraftAction to generate points every second
  class AutoCraftAction {
    constructor() {
      this.elapsedTime = 0;
    }

    execute(deltaTime) {
      this.elapsedTime += deltaTime;
      if (this.elapsedTime >= 1000) {
        this.elapsedTime = 0;
        if (gameState.autoCrafters > 0) {
          const efficiency = gameState.autoCrafterEfficiency || 1;
          gameState.points += gameState.autoCrafters * efficiency;
          console.log(
            `Auto-crafters generated ${
              gameState.autoCrafters * efficiency
            } points!`
          );
        }
      }
    }
  }

  // Instantiate auto-crafting action
  const autoCraftAction = new AutoCraftAction();

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
    const isThresholdExceeded = gameState.points > 50;
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

  // Create an Upgrade Modifier
  class EfficiencyUpgradeModifier {
    constructor() {
      this.efficiencyMultiplier = 2; // Example: doubles the efficiency
    }

    update(deltaTime) {
      // Update logic, if necessary
    }

    shouldApply() {
      return true; // Always apply this modifier
    }

    apply() {
      gameState.autoCrafterEfficiency = this.efficiencyMultiplier;
    }

    cleanup() {
      // Cleanup logic, if necessary
    }
  }

  // Define a Purchase Upgrade Action
  class PurchaseUpgradeAction {
    constructor(cost, modifier) {
      this.cost = cost;
      this.modifier = modifier;
    }

    execute() {
      if (gameState.points >= this.cost) {
        gameState.points -= this.cost;
        gameModifierComposite.addModifier(new this.modifier());
        console.log("Upgrade purchased!");
      } else {
        console.log("Not enough points for this upgrade.");
      }
    }
  }

  // Instantiate the GameModifierComposite
  const gameModifierComposite = new GameModifierComposite();

  // Instantiate a purchase upgrade action
  const purchaseEfficiencyUpgrade = new PurchaseUpgradeAction(
    100,
    EfficiencyUpgradeModifier
  );

  // Add button event listener for purchasing the upgrade
  document
    .getElementById("purchase-efficiency-upgrade-btn")
    .addEventListener("click", () => {
      purchaseEfficiencyUpgrade.execute();
    });

  // Add the upgrade modifier update to the game loop
  gameLoop.registerUpdateCallback((deltaTime) => {
    gameModifierComposite.update(deltaTime);
    // Other update callbacks...
  });

  // Auto-Crafter-Crafter Action
  class AutoCrafterCrafterAction {
    constructor() {
      this.elapsedTime = 0;
      this.interval = 10000; // 10 seconds interval
    }

    execute(deltaTime) {
      console.log(
        `AutoCrafterCrafterAction - Before incrementing, Elapsed Time: ${this.elapsedTime}`
      );
      this.elapsedTime += deltaTime;
      console.log(
        `AutoCrafterCrafterAction - After incrementing, Elapsed Time: ${this.elapsedTime}`
      );

      if (this.elapsedTime >= this.interval) {
        this.elapsedTime = 0;
        gameState.autoCrafters++; // Increment auto-crafters
        console.log("An auto-crafter has been crafted!");
        updateAutoCrafterDisplay();
      }
    }
  }

  // Purchase Auto-Crafter-Crafter Action
  class PurchaseAutoCrafterCrafterAction {
    constructor(cost) {
      this.cost = cost;
    }

    execute() {
      if (gameState.points >= this.cost) {
        gameState.points -= this.cost;
        gameState.autoCrafterCrafters++; // Increment the auto-crafter-crafters count
        const autoCrafterCrafter = new AutoCrafterCrafterAction();
        gameState.autoCrafterCrafterActions.push(autoCrafterCrafter); // Add to the gameState array
        updateAutoCrafterCrafterDisplay(); // Update the auto-crafter-crafter display
        console.log("Auto-crafter-crafter purchased!");
      } else {
        console.log("Not enough points to purchase an auto-crafter-crafter.");
      }
    }
  }

  // Instantiate and add event listener for purchasing the auto-crafter-crafter
  const purchaseAutoCrafterCrafter = new PurchaseAutoCrafterCrafterAction(500); // Example cost
  document
    .getElementById("purchase-auto-crafter-crafter-btn")
    .addEventListener("click", () => {
      purchaseAutoCrafterCrafter.execute();
      console.log(
        `Actions count after purchase: ${gameState.autoCrafterCrafterActions.length}`
      );
    });

  class DeductPointsAction {
    constructor(amount) {
      this.amount = amount;
    }
    execute() {
      if (gameState.points >= this.amount) {
        gameState.points -= this.amount;
      } else {
        throw new Error("Not enough points");
      }
    }
  }

  class DeductAutoCraftersAction {
    constructor(amount) {
      this.amount = amount;
    }
    execute() {
      if (gameState.autoCrafters >= this.amount) {
        gameState.autoCrafters -= this.amount;
      } else {
        throw new Error("Not enough auto-crafters");
      }
    }
  }

  class PurchaseAutoCrafterCrafterCrafterAction {
    constructor(pointsCost, autoCraftersCost) {
      this.pointsCost = pointsCost;
      this.autoCraftersCost = autoCraftersCost;
      this.compositeAction = new GameActionComposite();
      this.compositeAction.add(new DeductPointsAction(pointsCost));
      this.compositeAction.add(new DeductAutoCraftersAction(autoCraftersCost));
    }

    execute() {
      try {
        this.compositeAction.execute();
        const newAction = new AutoCrafterCrafterCrafterAction();
        gameState.autoCrafterCrafterCrafters++;
        gameState.autoCrafterCrafterCrafterActions.push(newAction);
        updateAutoCrafterCrafterCrafterDisplay();
        console.log("AutoCrafter-Crafter-Crafter purchased!");
      } catch (error) {
        console.error(error.message);
      }
    }
  }

  // Instantiate and add event listener for purchasing the AutoCrafter-Crafter-Crafter
  const purchaseAutoCrafterCrafterCrafter =
    new PurchaseAutoCrafterCrafterCrafterAction(1000, 50); // Example cost
  document
    .getElementById("purchase-auto-crafter-crafter-crafter-btn")
    .addEventListener("click", () => {
      purchaseAutoCrafterCrafterCrafter.execute();
      updateAutoCrafterDisplay(); // Update displays if needed
      updatePointsDisplay();
    });

  class AutoCrafterCrafterCrafterAction {
    constructor() {
      this.elapsedTime = 0;
      this.interval = 30000; // Example: 30 seconds interval
    }

    execute(deltaTime) {
      this.elapsedTime += deltaTime;
      if (this.elapsedTime >= this.interval) {
        this.elapsedTime = 0;
        // Example logic: Creates an AutoCrafter-Crafter
        gameState.autoCrafterCrafters++;
        console.log("An AutoCrafter-Crafter-Crafter has been crafted!");
        updateAutoCrafterCrafterDisplay();
      }
    }
  }

  // Initialize points display
  modifyPoints(0);
});
