function Swarm(invaders) {
  this.draw = function(painter) {
    invaders.forEach(function(i) {
      i.draw(painter);
    });
  };

  this.update = function(dt, input) {
    invaders.forEach(function(i) {
      i.update(dt, input);
    });
  };

  return this;
}
