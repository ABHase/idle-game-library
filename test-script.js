import { Reward } from "./dist/Reward.js";
import {
  createFixedRatioPrecondition,
  createFixedIntervalPrecondition,
  createVariableIntervalPrecondition,
  createVariableRatioPrecondition,
} from "./dist/RewardPrecondition.js";

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

  // Fixed Ratio
  const fixedRatioReward = new Reward(10, () => {
    fixedRatioDisplay.textContent = `Reward earned: 10 points`;
  });
  fixedRatioReward.addPrecondition(createFixedRatioPrecondition(5));
  document.getElementById("fixed-ratio-btn").addEventListener("click", () => {
    fixedRatioReward.update(1);
  });

  // Variable Ratio
  const variableRatioReward = new Reward(15, () => {
    variableRatioDisplay.textContent = `Reward earned: 15 points`;
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
    fixedIntervalDisplay.textContent = `Reward earned: 20 points`;
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
    variableIntervalDisplay.textContent = `Reward earned: 25 points`;
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
});
