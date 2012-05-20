function Invader(initial_velocity, initial_x, initial_y, initial_countdown, bullet) {
  var width = 66, height = 48;
  var minimum_time_between_shots = 10;//seconds
  var active = true;

  var velocity = initial_velocity || 50;
  var x = initial_x || 0;
  var y = initial_y || 0;

  this.box = new BoundingBox(x, y, width, height) ;

  var shoot_countdown = (initial_countdown || 0) + minimum_time_between_shots;
  var time_alive = 0;

  var its_time_to_shoot = function() {
    return (time_alive % shoot_countdown === 0);
  };

  this.update = function(delta_time) {
    time_alive += delta_time;

    // Shooting
    if(its_time_to_shoot()) {
      bullet.shoot(50, this.box.x + (width / 2), this.box.y + (height / 2));
    }

    // Movement
    this.box.x += delta_time * velocity;
  };

  this.draw = function(painter) {
    if(this.box.width !== 0 && this.box.height !== 0) {
      painter.draw_invader(this.box.x, this.box.y);
    }
  };

  this.collide = function() {
    this.box.make_unhittable();
  };

  return this;
}
