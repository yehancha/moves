class RandomTargetGenerator {
  constructor(room) {
    this.room = room;
  }

  startGeneration() {
    setInterval(this.generateRandomTargets.bind(this), 400);
  }

  generateRandomTargets() {
    let count = Math.floor(Math.random() * 2);
    for (let i = 0; i < count; i++) {
      this.generateRandomTarget();
    }
  }

  generateRandomTarget() {
    let maxX = this.room.width;
    let maxY = this.room.height;
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    let target = new Target();
    target.x = randomX;
    target.y = randomY;

    room.addTarget(target);
  }
}
