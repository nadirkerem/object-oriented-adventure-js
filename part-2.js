class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.inventory = [];
  }
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
  }
}

const robin = new Character('Robin');
robin.inventory = ['sword', 'potion', 'artifact'];
robin.companion = new Character('Leo');
robin.companion.type = 'Cat';
robin.companion.companion = new Character('Frank');
robin.companion.companion.type = 'Flea';
robin.companion.companion.inventory = ['small hat', 'sunglasses'];
