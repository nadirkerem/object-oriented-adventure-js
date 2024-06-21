export default class Inventory {
  constructor(items = []) {
    this.items = items;
  }

  addItem(item) {
    this.items.push(item);
    console.log(`${item} added to the inventory.`);
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      console.log(`${item} removed from the inventory.`);
    } else {
      console.log(`${item} not found in the inventory.`);
    }
  }

  searchItem(item) {
    if (this.items.includes(item)) {
      console.log(`${item} is in the inventory.`);
      return true;
    } else {
      console.log(`${item} is not in the inventory.`);
      return false;
    }
  }

  sellItem(item, price) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      console.log(`${item} sold for ${price} gold coins.`);
    } else {
      console.log(`${item} not found in the inventory.`);
    }
  }

  tradeItem(item, targetInventory) {
    const index = this.items.indexOf(item);
    if (index > -1) {
      this.items.splice(index, 1);
      targetInventory.addItem(item);
      console.log(`${item} traded to another inventory.`);
    } else {
      console.log(`${item} not found in the inventory.`);
    }
  }
}
