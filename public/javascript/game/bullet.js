function Bullet(velocity, x, y) {
  var active = false;
  var width = 4;
  var height = 20;

  this.x = 0;
  this.y = 0;

  this.box = new BoundingBox(this, 0, 0);

  this.shoot = function(new_velocity, new_x, new_y, owner) {
    velocity = new_velocity;
    this.x = new_x;
    this.y = new_y;
    this.box.set(width, height);
    this.owner = owner;
    active = true;
  };

  this.update = function(delta_time) {
    this.y = this.y + (delta_time * velocity);
  };

  this.draw = function(painter) {
    if (active) {
      painter.draw_bullet(this);
    }
  };

  this.collide = function(other_thing) {
    if(Object.getPrototypeOf(other_thing) === Invader.prototype) {
      this.box.make_unhittable();
    }
  };

  return this;
}
