class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  static MAX_HEALTH = 100;
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }
}

class Adventurer extends Character {
  constructor(name, role) {
    super(name);
    if (Adventurer.ROLES.includes(role)) {
      this.role = role;
    }
    this.inventory.push('bedroll', '50 gold coins');
  }
  static ROLES = ['Rogue', 'Fighter', 'Healer', 'Wizard'];
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
  duel(adventurer) {
    while (this.health > 50 && adventurer.health > 50) {
      const myRoll = this.roll();
      const theirRoll = adventurer.roll();

      if (myRoll > theirRoll) {
        adventurer.health -= 1;
      } else if (theirRoll > myRoll) {
        this.health -= 1;
      } else {
        console.log('Tie! No damage dealt.');
      }

      console.log(
        `Round results: ${this.name} rolled ${myRoll}, ${adventurer.name} rolled ${theirRoll}.`
      );
      console.log(
        `Current health: ${this.name} - ${this.health}, ${adventurer.name} - ${adventurer.health}`
      );
    }

    const winner = this.health > 50 ? this : adventurer;
    console.log(`The winner is ${winner.name} with health ${winner.health}!`);
  }
  attack() {
    if (this.role === 'Fighter') {
      console.log(`${this.name} swings their sword!`);
    } else {
      console.log(`${this.name} attacks!`);
    }
  }
  heal(target = this) {
    if (this.role === 'Healer') {
      const healAmount = 10;
      target.health = Math.min(
        Character.MAX_HEALTH,
        target.health + healAmount
      );
      console.log(
        `${this.name} heals ${target.name} for ${healAmount} health. ${target.name}'s current health: ${target.health}`
      );
    } else {
      console.log(`${this.name} can't heal.`);
    }
  }
}

class Companion {
  constructor(name, type, belongings = []) {
    this.name = name;
    this.type = type;
    this.belongings = belongings;
  }
  acquire(item) {
    this.belongings.push(item);
    console.log(`${this.name} acquired a ${item}.`);
  }
  assist() {
    console.log(`${this.name} is assisting in the adventure.`);
  }
}

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

/*
const robin = new Adventurer('Robin', 'Rogue');
robin.inventory = ['sword', 'potion', 'artifact'];
robin.companion = new Companion('Leo', 'Cat');
robin.companion.companion = new Companion('Frank', 'Flea', [
  'small hat',
  'sunglasses',
]);

const john = new Adventurer('John', 'Fighter');
john.inventory = ['axe', 'shield', 'chainmail'];
john.companion = new Companion('Luna', 'Wolf');
john.companion.companion = new Companion('Rex', 'Bear', ['honey', 'fish']);
...
*/

const healersFactory = new AdventurerFactory('Healer');
const robin = healersFactory.generate('Robin');

const fightersFactory = new AdventurerFactory('Fighter');
const john = fightersFactory.generate('John');

healersFactory.findByName('Robin').duel(fightersFactory.findByName('John'));

fightersFactory.findByName('John').attack();

healersFactory.findByName('Robin').heal();
