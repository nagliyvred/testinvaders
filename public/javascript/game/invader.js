function Invader(initial_velocity, initial_x, initial_y) {
  var velocity = initial_velocity || 50;
  var x = initial_x || 0;
  var y = initial_y || 0;
  var width = 66 ;
  var height = 48 ;
  this.box = new BoundingBox(x, y, width, height) ;
  
  this.update = function(dt) {
    this.box.x += dt * velocity;
  };

  this.draw = function(painter) {
    painter.draw_invader(this.box.x, this.box.y);
  };

  this.collide = function() {
  } ;

  return this;
}
