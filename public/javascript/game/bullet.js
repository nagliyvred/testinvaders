function Bullet(velocity, x, y) {
  this.y = y;

  this.update = function(dt) {
    this.y = dt * velocity;
  };

  this.box = function() {
    return {
      x: x,
      y: y,
      width: 4,
      height: 12,
    };
  };

  return this;
}
