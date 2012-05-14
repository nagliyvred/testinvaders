function Invader(initial_velocity, initial_x, initial_y) {
  var velocity = initial_velocity || 50;
  var x = initial_x || 0;
  var y = initial_y || 0;

  this.update = function(dt) {
    x += dt * velocity;
  };

  this.draw = function(painter) {
    painter.draw_invader(x, y);
  };

  this.box = function() {
    return {
      x: x,
      y: y,
      width: 66,
      height: 48
    };
  };

  return this;
}
