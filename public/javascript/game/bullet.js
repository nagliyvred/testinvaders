function Bullet(team, velocity, x, y) {
  this.team = team ;
  var active = false;
  var width = 4 ;
  var height = 20 ;

  this.box = new BoundingBox(x, y, 0, 0) ;

  this.shoot = function(new_velocity, new_x, new_y) {
    velocity = new_velocity;
    this.box.reset(new_x, new_y, width, height) ;
    active = true;
  };

  this.update = function(delta_time) {
    this.box.y = this.box.y + (delta_time * velocity);
  };

  this.draw = function(painter) {
    if (active) {
      painter.draw_bullet(this.box.x, this.box.y);
    }
  };

  this.collide = function() {
    active = false;
    this.box.make_unhittable();
  };

  return this;
}
