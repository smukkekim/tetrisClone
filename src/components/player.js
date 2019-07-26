class Player {
  constructor(name) {
    this.name = name;
    this.piece = null;
    this.points = 0;
  }

  addPoints(points) {
    this.points += points;
  }
}

export default Player;
