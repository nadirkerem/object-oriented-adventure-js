import Inventory from './inventory.js';

export default class Companion {
  constructor(name, type, belongings = []) {
    this.name = name;
    this.type = type;
    this.inventory = new Inventory(belongings);
  }
  acquire(item) {
    this.inventory.addItem(item);
  }
  assist(adventurer) {
    console.log(
      `${this.name} is assisting ${adventurer.name} in the adventure.`
    );
  }
}
