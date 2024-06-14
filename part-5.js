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
}

const robin = new Adventurer('Robin', 'Rogue');
robin.inventory = ['sword', 'potion', 'artifact'];
robin.companion = new Companion('Leo', 'Cat');
robin.companion.companion = new Companion('Frank', 'Flea', [
  'small hat',
  'sunglasses',
]);

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

const healers = new AdventurerFactory('Healer');
