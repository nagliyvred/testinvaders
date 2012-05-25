function Invader(initial_x, initial_y, bullet) {
  var width = 66, height = 48;
  var minimum_time_between_shots = 20;//seconds

  var x = initial_x || 0;
  var y = initial_y || 0;

  this.position = new Position(x,y);
  this.velocity = 50;
  this.active = true;
  this.box = new BoundingBox(this.position, width, height);

  var shoot_countdown = Math.random() * minimum_time_between_shots;

  var its_time_to_shoot = function() {
    return shoot_countdown <= 0;
  };

  var reset_shoot_countdown = function() {
    shoot_countdown = minimum_time_between_shots;
  };

  this.update = function(delta_time) {
    if (!this.active) {
      return;
    }

    shoot_countdown -= delta_time;

    // Shooting
    if(its_time_to_shoot()) {
      bullet.shoot(50, this.position.x + (width / 2), this.position.y + (height / 2), this);
      reset_shoot_countdown();
    }

    // Movement
    this.position.x += delta_time * this.velocity;
  };

  this.collide = function(other_thing) {
    if(other_thing.owner && Object.getPrototypeOf(other_thing.owner) === Tank.prototype) {
      this.active = false;
      this.box.make_unhittable();
    }
  };

  this.invade = function() {
    this.position.y += 10;
    this.velocity = this.velocity * -1;
  };

  return this;
}
