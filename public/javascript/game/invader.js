function Invader(initial_velocity, initial_x, initial_y, initial_countdown, bullet) {
  var width = 66, height = 48;
  var minimum_time_between_shots = 20;//seconds
  var active = true;

  var velocity = initial_velocity || 50;
  var x = initial_x || 0;
  var y = initial_y || 0;
  this.position = new Position(x,y);
  this.box = new BoundingBox(this.position, width, height);

  var shoot_countdown = (initial_countdown || 0);

  var its_time_to_shoot = function() {
    return shoot_countdown <= 0;
  };

  var reset_shoot_countdown = function() {
    shoot_countdown = minimum_time_between_shots;
  };

  this.update = function(delta_time) {
    if (!active) {
      return;
    }

    shoot_countdown -= delta_time;

    // Shooting
    if(its_time_to_shoot()) {
      bullet.shoot(50, this.position.x + (width / 2), this.position.y + (height / 2), this);
      reset_shoot_countdown();
    }

    // Movement
    this.position.x += delta_time * velocity;
  };

  this.draw = function(painter) {
    if (active) {
      painter.draw_invader(this.position);
    }
  };

  this.collide = function(other_thing) {
    if(other_thing.owner && Object.getPrototypeOf(other_thing.owner) === Tank.prototype) {
      active = false;
      this.box.make_unhittable();
    }
  };

  return this;
}
