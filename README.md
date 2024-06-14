# Object-Oriented Adventure Game

Welcome to the Object-Oriented Adventure Game! This project is to practice and demonstrate the principles of object-oriented programming by building a simple adventure game where characters with different roles interact with each other and their companions.

This project was developed as part of the Per Scholas Software Engineering Intensive Program.

## Concepts and Structure

- **Character**: The base class representing any character in the game.
- **Adventurer**: A subclass of Character, with specific roles like Rogue, Fighter, Healer, and Wizard. Each role has unique abilities and actions.
- **Companion**: Represents a companion that assists an adventurer with additional inventory and support.
- **AdventurerFactory**: A factory class for creating adventurers with predefined roles and inventories.
- **Inventory**: Manages the items held by characters and companions, allowing for adding, removing, and trading items.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/nadirkerem/object-oriented-adventure-js
   ```

2. Navigate to the project directory.

3. Open the project in your preferred code editor.

## Play the Game

To play the Object-Oriented Adventure Game, you can create instances of the various classes and interact with them. Here’s a brief example of how to get started:

1. Create adventurers using the `AdventurerFactory`:

   ```javascript
   const fightersFactory = new AdventurerFactory('Fighter');
   const fighterJohn = fightersFactory.generate(
     'John',
     ['axe', 'shield', 'chainmail'],
     new Companion('Luna', 'Wolf')
   );
   ```

2. Manage inventory items:

   ```javascript
   fighterJohn.inventory.addItem('health potion');
   fighterJohn.inventory.removeItem('axe');
   ```

3. Interact with other characters:
   ```javascript
   fighterJohn.attack(rogueRobin);
   healerRobin.heal(fighterJohn);
   ```

Several examples are already provided within the code to help you understand how to create and interact with adventurers, companions, and their inventories.

Feel free to explore and expand the game by adding new features and interactions!
