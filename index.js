import { AdventurerFactory } from './src/adventurer.js';
import Companion from './src/companion.js';

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

fighterJohn.companion.inventory.addItem('honey');
fighterJohn.companion.inventory.addItem('fish');

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

wizardGandalf.companion.inventory.addItem('crystal');
wizardGandalf.companion.inventory.addItem('gold');

// Inventory interactions

healerRobin.inventory.addItem('magic scroll');

healerRobin.inventory.removeItem('herbs');

healerRobin.inventory.searchItem('healing potion');

healerRobin.inventory.sellItem('magic scroll', 100);

healerRobin.inventory.tradeItem('healing potion', fighterJohn.inventory);

// Adventurer interactions

rogueRobin.scout();

healerRobin.duel(wizardGandalf);

healerRobin.heal(fighterJohn);

fighterJohn.attack(rogueRobin);

rogueRobin.sneakAttack(wizardGandalf);

wizardGandalf.castSpell(fighterJohn);

fighterJohn.companion.assist(fighterJohn);

wizardGandalf.companion.assist(wizardGandalf);
