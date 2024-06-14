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
    this.roll();
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
  sneakAttack(target) {
    if (this.role === 'Rogue') {
      const damage = this.roll(3);
      target.health -= damage;
      console.log(
        `${this.name} performs a sneak attack on ${target.name} causing ${damage} damage. ${target.name}'s current health: ${target.health}`
      );
    } else {
      console.log(`${this.name} can't perform a sneak attack.`);
    }
  }
  attack(target) {
    if (this.role === 'Fighter') {
      const damage = this.roll(2);
      target.health -= damage;
      console.log(
        `${this.name} swings their sword at ${target.name} causing ${damage} damage. ${target.name}'s current health: ${target.health}`
      );
    } else {
      console.log(`${this.name} attacks ${target.name}!`);
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
  castSpell(target) {
    if (this.role === 'Wizard') {
      const damage = this.roll(5);
      target.health -= damage;
      console.log(
        `${this.name} casts a spell on ${target.name} causing ${damage} damage. ${target.name}'s current health: ${target.health}`
      );
    } else {
      console.log(`${this.name} can't cast spells.`);
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
  assist(adventurer) {
    console.log(
      `${this.name} is assisting ${adventurer.name} in the adventure.`
    );
  }
}

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name, inventory = [], companion = null) {
    const newAdventurer = new Adventurer(name, this.role);
    newAdventurer.inventory = inventory;
    newAdventurer.companion = companion;
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }
  findByIndex(index) {
    return this.adventurers[index];
  }
  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

// Adventurer instances
const healersFactory = new AdventurerFactory('Healer');
const healerRobin = healersFactory.generate(
  'Robin',
  ['healing potion', 'herbs'],
  new Companion('Leo', 'Cat')
);

const fightersFactory = new AdventurerFactory('Fighter');
const fighterJohn = fightersFactory.generate(
  'John',
  ['axe', 'shield', 'chainmail'],
  new Companion('Luna', 'Wolf')
);

fighterJohn.companion.companion = new Companion('Rex', 'Bear', [
  'honey',
  'fish',
]);

const rogueFactory = new AdventurerFactory('Rogue');
const rogueRobin = rogueFactory.generate(
  'Robin',
  ['dagger', 'lockpick'],
  new Companion('Shadow', 'Raven')
);

const wizardFactory = new AdventurerFactory('Wizard');
const wizardGandalf = wizardFactory.generate(
  'Gandalf',
  ['wand', 'spellbook'],
  new Companion('Flame', 'Phoenix')
);

wizardGandalf.companion.companion = new Companion('Spark', 'Dragon', [
  'crystal',
  'gold',
]);

// Adventurer interactions
rogueRobin.scout();

healerRobin.duel(wizardGandalf);

healerRobin.heal(fighterJohn);

fighterJohn.attack(rogueRobin);

rogueRobin.sneakAttack(wizardGandalf);

wizardGandalf.castSpell(fighterJohn);

fighterJohn.companion.assist(fighterJohn);

fighterJohn.companion.companion.acquire('magic berry');

wizardGandalf.companion.assist(wizardGandalf);

wizardGandalf.companion.companion.acquire('dragon scale');
