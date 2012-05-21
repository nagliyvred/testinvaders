function Bullet(velocity, x, y) {
  this.team = "us" ;
  var active = false;
  var x = 0 ;
  var y = 0 ;
  var width = 4 ;
  var height = 20 ;

  this.position = new Position(x, y);
  this.box = new BoundingBox(this.position, 0, 0) ;

  this.shoot = function(new_velocity, new_x, new_y) {
    velocity = new_velocity;
    this.position.x = new_x ;
    this.position.y = new_y ;
    this.box.set(this.position, width, height) ;
    active = true;
  };

  this.update = function(delta_time) {
    this.position.y = this.position.y + (delta_time * velocity);
  };

  this.draw = function(painter) {
    if (active) {
      painter.draw_bullet(this.position.x, this.position.y);
    }
  };

  this.collide = function() {
    active = false;
    this.box.make_unhittable();
  };

  this.joinTeamThem = function() {
    this.team = "them" ;
  } ;

  return this;
}
