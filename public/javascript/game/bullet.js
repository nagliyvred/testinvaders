function Bullet(velocity, x, y) {
  var active = false;
  var width = 4;
  var height = 20;

  x = 0;
  y = 0;

  this.position = new Position(x, y);
  this.box = new BoundingBox(this.position, 0, 0);

  this.shoot = function(new_velocity, new_x, new_y, owner) {
    velocity = new_velocity;
    this.position.x = new_x;
    this.position.y = new_y;
    this.box.set(this.position, width, height);
    this.owner = owner;
    active = true;
  };

  this.update = function(delta_time) {
    this.position.y = this.position.y + (delta_time * velocity);
  };

  this.draw = function(painter) {
    if (active) {
      painter.draw_bullet(this.position);
    }
  };

  this.collide = function(other_thing) {
    if(Object.getPrototypeOf(other_thing) === Invader.prototype) {
      this.box.make_unhittable();
    }
  };

  return this;
}
