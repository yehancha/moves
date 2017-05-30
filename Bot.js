class Bot {
  constructor (name = "Bot", x = 0, y = 0, room, bases) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.targetX = x;
    this.targetY = y;
    this.room = room;
    this.bases = bases;
    this.speed = 1;
    room.addBot(this);
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
    this.move();
  }

  move() {
    if (!this.moveId) {
      this.moveId = setInterval(this.step.bind(this), 15);
    }
  }

  step() {
    if (this.x === this.targetX && this.y === this.targetY) {
      clearInterval(this.moveId);
      this.moveId = null;

      if (this.target) {
        this.target.aquired = true;
      }

      return;
    }

    if (this.x < this.targetX) {
      this.x = this.x + this.speed;
      if (this.x > this.targetX) {
        this.x = this.targetX;
      }
    } else if (this.x > this.targetX) {
      this.x = this.x - this.speed;
      if (this.x < this.targetX) {
        this.x = this.targetX;
      }
    }

    if (this.y < this.targetY) {
      this.y = this.y + this.speed;
      if (this.y > this.targetY) {
        this.y = this.targetY;
      }
    } else if (this.y > this.targetY) {
      this.y = this.y - this.speed;
      if (this.y < this.targetY) {
        this.y = this.targetY;
      }
    }
  }

  stop() {
    this.targetX = this.x;
    this.targetY = this.y;
  }

  dismiss() {
    if (!this.bases) return;

    let currentCost = 99999999;
    let currentBase = null;
    let bases = this.bases;
    const baseCount = bases.length;

    for (let i = 0; i < baseCount; i++) {
      let newBase = bases[i];
      let newCost = this.calculateCost(newBase);
      if (newCost < currentCost) {
        currentBase = newBase;
        currentCost = newCost;
      }
    }

    if (currentBase) {
      this.speed = 1;
      this.setTarget(currentBase.x, currentBase.y);
    }
  }

  dismissRandom() {
    let maxX = this.room.width;
    let maxY = this.room.height;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    
    this.speed = 1;
    this.setTarget(randomX, randomY);
  }

  assignTarget(target) {
    this.target = target;
    this.target.assignBot(this);
    this.setTarget(target.x, target.y);
  }

  releaseTarget() {
    this.target = null;
    this.dismiss();
  }

  isAssignedTarget() {
    return this.target != null;
  }

  calculateCost(target) {
    let costX = this.x - target.x;
    let costY = this.y - target.y;

    if (costX < 0) costX = -costX;
    if (costY < 0) costY = -costY;

    return costX + costY;
  }

  boost(multiplex) {
    this.speed = multiplex;
  }
}
