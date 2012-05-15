function Invader(initial_velocity, initial_x, initial_y, initial_shot_countdown, bullet) {
  var velocity = initial_velocity || 50;
  var x = initial_x || 0;
  var y = initial_y || 0;
  var adjusted_countdown = (initial_shot_countdown || 0) + 10;

  var shot_countdown = adjusted_countdown;
  var active = true;

  this.update = function(delta_time) {
    if((shot_countdown -= delta_time) < 0) {
      bullet.shoot(50, x, y);
      shot_countdown = adjusted_countdown;
    }
    x += delta_time * velocity;
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
