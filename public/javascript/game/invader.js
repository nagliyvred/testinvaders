function Invader(initial_velocity, initial_x, initial_y) {
  var velocity = initial_velocity || 50;
  var x = initial_x || 0;
  var y = initial_y || 0;
  var active = true;

  this.update = function(dt) {
    x += dt * velocity;
  };

  this.draw = function(painter) {
    if(active) {
      painter.draw_invader(x, y);
    }
  };

  this.box = function() {
    if(active) {
      return {
        x: x,
        y: y,
        width: 66,
        height: 48
      };
    } else {
      return {
        width: 0,
        height: 0
      }
    }
  };

  this.collide = function() {
    active = false;
  };

  return this;
}
