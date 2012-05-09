function Bullet(velocity) {
  this.update = function(dt) {
    this.x = dt * velocity;
  };

  return this;
}
