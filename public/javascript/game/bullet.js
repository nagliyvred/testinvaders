function Bullet(velocity, x, y) {
  var active = false;

  this.shoot = function(new_velocity, new_x, new_y) {
    velocity = new_velocity;
    x = new_x;
    y = new_y;
    active = true;
  };

  this.update = function(delta_time) {
    y = y + (delta_time * velocity);
  };

  this.draw = function(painter) {
    if (active) {
      painter.draw_bullet(x, y);
    }
  };

  this.box = function() {
    if (active) {
      return {
        x: x,
        y: y,
        width: 4,
        height: 12,
      };
    } else {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      };
    }
  };

  this.collide = function() {
    active = false;
  };

  return this;
}
