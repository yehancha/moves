class Target {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.aquired = false;
  }

  assignBot(bot) {
    this.bot = bot;
  }

  isAssignedBot() {
    return this.bot != null;
  }

  releaseBot() {
    this.bot.releaseTarget();
    this.bot = null;
  }
}
