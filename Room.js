class Room {
  constructor (width, height) {
    this.width = width;
    this.height = height;
    this.bots = [];
    this.targets = [];
    this.base = new Target(0, 0);
  }

  addBot(bot) {
    this.bots.push(bot);
  }

  dismissBots() {
    this.bots.forEach((bot) => bot.dismiss());
  }

  addTarget(target) {
    this.targets.push(target);
  }

  removeTarget(target) {
    this.targets.remove(target);
  }
}
