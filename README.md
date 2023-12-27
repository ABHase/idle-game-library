# Incremental Game Mechanics Library

This JavaScript library is designed to simplify the development of idle or incremental games. It provides a structured approach to adding common game mechanics like actions, modifiers, rewards, and punishments.

## Features

- **GameActionComposite:** Manage a collection of game actions.
- **GameLoop:** Control the main game loop and timing of updates.
- **GameModifierComposite:** Apply and manage a set of game modifiers.
- **Punishment:** Define negative consequences for player actions or inactions.
- **Reward:** Set up rewards for player achievements.
- **Preconditions:** Establish criteria for rewards and punishments.

## Installation

Example of how to include this library in your project, simply clone the repository or download the files and import them into your HTML or JavaScript modules:

```html
<script type="module" src="path/to/GameLoop.js"></script>
```

Repeat the import statement for each class you need from the library.

**Usage**

**Game Loop**

The `GameLoop` class runs the game update cycle. Use it to
register update callbacks that define the game's behavior:

```javascript const
gameLoop = new GameLoop(); gameLoop.start(200); // Starts the loop with a tick
every 200 milliseconds
```

**Actions and Modifiers**

Use GameActionComposite to group several actions that should be executed together. Similarly, GameModifierComposite allows for multiple modifiers to be applied or removed together:

```javascript
const actionComposite = new GameActionComposite();
actionComposite.add(new SomeGameAction());
// ...

const modifierComposite = new GameModifierComposite();
modifierComposite.addModifier(new SomeGameModifier());
// ...
```

**Rewards and Punishments**

Create instances of Reward and Punishment to manage the incentives and consequences within your game. You can add preconditions to determine when they should be activated:

```javascript
const reward = new Reward(10, () => {
  // Reward logic here
});
reward.addPrecondition(createFixedIntervalPrecondition(5000));
// ...

const punishment = new Punishment("Loss of points", () => {
  // Punishment logic here
});
punishment.addPrecondition(
  createThresholdPunishmentPrecondition(() => {
    return gameState.points > 100;
  }, 5000)
);
// ...
```

**Game State Management**

While not part of the library, you'll need to maintain a game state. This can be a simple object that tracks various game properties:

```javascript
const gameState = {
  points: 0,
  autoCrafters: 0,
  // ... other properties
};
```

**Integrating with HTML**

Attach event listeners to your HTML elements to interact with the game:

```html
<button id="action-button">Do Action</button>
document.getElementById('action-button').addEventListener('click', () => { //
Call relevant game action or modifier here });
```

**Example**

An example implementation is provided to demonstrate how to integrate the different parts of the library into a working game. Refer to the example directory for the source code.

**Contributing**

Contributions are welcome. Please fork the repository and submit a pull request with your suggested changes.
