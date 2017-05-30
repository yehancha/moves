class JobScheduler {
  constructor (room) {
    this.room = room;
  }

  startScheduling() {
    if (!this.pid) {
      this.pid = setInterval(this.refreshSchedule.bind(this), 15);
    }
  }

  refreshSchedule() {
    let targets = this.room.targets;
    let targetCount = targets.length;
    for (let i = targetCount - 1; i >= 0; i--) {
      let target = targets[i];
      if (target.aquired) {
        target.releaseBot();
        targets.splice(i, 1);
      }
    }

    targetCount = targets.length;
    let bots = this.room.bots;
    let botCount = bots.length;
    for (let i = 0; i < targetCount; i++) {
      let target = targets[i];
      if (!target.isAssignedBot()) {
        let currentCost = 99999999;
        let currentBot = null;
        for (let j = 0; j < botCount; j++) {
          let bot = bots[j];
          if (!bot.isAssignedTarget()) {
            let newCost = bot.calculateCost(target);
            if (newCost < currentCost) {
              currentCost = newCost;
              currentBot = bot;
            }
          }
        }
        if (currentBot) {
          currentBot.assignTarget(target);
          currentBot.boost(Math.ceil(targetCount / botCount));
        }
      }
    }
  }
}
