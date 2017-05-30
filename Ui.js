class Ui {
  constructor (room) {
    this.room = room;
    this.body = document.getElementsByTagName('body')[0];
    this.botUis = [];
    this.targetUis = [];
    document.body.addEventListener("click", this.handleOnBodyClick.bind(this));
    this.addStatusText();
  }

  addStatusText() {
    this.statusText = document.createElement("div");
    this.statusText.className = "statusText";
    this.body.appendChild(this.statusText);
  }

  startRefresh() {
    setInterval(this.refresh.bind(this), 15);
  }

  refresh() {
    this.refreshTargetUis();
    this.refreshBotUis();
    this.refreshStatus();
  }

  refreshTargetUis() {
    let targetCount = this.room.targets.length;
    let targetUiCount = this.targetUis.length;
    let missing = targetCount - targetUiCount;

    if (missing > 0) {
      this.addTargetUis(missing);
    } else if (missing < 0) {
      this.removeTargetUis(-missing);
    }

    this.room.targets.forEach((target, index) => {
      let targetUiStyle = this.targetUis[index].style;
      targetUiStyle.left = target.x;
      targetUiStyle.top = target.y;
    });
  }

  addTargetUis(count) {
    for (let i = 0; i < count; i++) {
      let targetUi = document.createElement("div");
      targetUi.className = "target";
      this.targetUis.push(targetUi);
      this.body.appendChild(targetUi);
    }
  }

  removeTargetUis(count) {
    let initialTargetUiCount = this.targetUis.length;
    for (let i = 0; i < count; i++) {
      this.body.removeChild(this.targetUis[initialTargetUiCount - 1 - i]);
      this.targetUis.pop();
    }
  }

  refreshBotUis() {
    let botCount = this.room.bots.length;
    let botUiCount = this.botUis.length;
    let missing = botCount - botUiCount;

    if (missing > 0) {
      this.addBotUis(missing);
    } else if (missing < 0) {
      this.removeBotUis(-missing);
    }

    this.room.bots.forEach((bot, index) => {
      let botUiStyle = this.botUis[index].style;
      botUiStyle.left = bot.x;
      botUiStyle.top = bot.y;
    });
  }

  addBotUis(count) {
    for (let i = 0; i < count; i++) {
      let botUi = document.createElement("div");
      botUi.className = "bot";
      this.botUis.push(botUi);
      this.body.appendChild(botUi);
    }
  }

  removeBotUis(count) {
    let initialBotUiCount = this.botUis.length;
    for (let i = 0; i < count; i++) {
      this.body.removeChild(this.botUis[initialBotUiCount - 1 - i]);
      this.botUis.pop();
    }
  }

  refreshStatus() {
    this.statusText.innerHTML = this.room.targets.length;
  }

  handleOnBodyClick(event) {
    this.room.targets.push(new Target(event.clientX, event.clientY));
  }
}
