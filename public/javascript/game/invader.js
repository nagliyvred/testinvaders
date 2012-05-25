function Invader(initial_x, initial_y, bullet) {
  var width = 66, height = 48;
  var default_time_between_shots = 20;//seconds
  var shoot_countdown = Math.random() * default_time_between_shots;

  this.velocity = 50;
  this.active = true;
  this.box = new BoundingBox(initial_x, initial_y, width, height);

  var its_time_to_shoot = function() {
    return shoot_countdown <= 0;
  };

  var reset_shoot_countdown = function() {
    shoot_countdown = default_time_between_shots;
  };

  this.update = function(delta_time) {
    shoot_countdown -= delta_time;

    // Shooting
    if(its_time_to_shoot()) {
      bullet.shoot(50, this.box.x + (width / 2), this.box.y + (height / 2), this);
      reset_shoot_countdown();
    }

    // Movement
    this.box.x += delta_time * this.velocity;
  };

  this.collide = function(other_thing) {
    if(other_thing.owner && Object.getPrototypeOf(other_thing.owner) === Tank.prototype) {
      this.active = false;
    }
  };

  this.invade = function() {
    this.box.y += 10;
    this.velocity = this.velocity * -1;
  };

  return this;
}
