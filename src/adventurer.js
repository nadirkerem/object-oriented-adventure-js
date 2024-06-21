import Character from './character.js';

export class Adventurer extends Character {
  constructor(name, role) {
    super(name);
    if (Adventurer.ROLES.includes(role)) {
      this.role = role;
    }
    this.inventory.addItem('bedroll');
    this.inventory.addItem('50 gold coins');
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

export class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }
  generate(name, inventoryItems = [], companion = null) {
    const newAdventurer = new Adventurer(name, this.role);
    inventoryItems.forEach((item) => newAdventurer.inventory.addItem(item));
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
