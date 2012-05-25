function Bullet() {
  var width = 4;
  var height = 20;
  var velocity = 0;

  x = 0;
  y = 0;

  this.active = false;
  this.position = new Position(x, y);
  this.box = new BoundingBox(this.position, 0, 0);

  this.shoot = function(new_velocity, new_x, new_y, owner) {
    velocity = new_velocity;
    this.position.x = new_x;
    this.position.y = new_y;
    this.box.set(this.position, width, height);
    this.owner = owner;
    this.active = true;
  };

  this.update = function(delta_time) {
    this.position.y = this.position.y + (delta_time * velocity);

    if (this.position.y < 0) {
      this.active = false;
      this.box.make_unhittable();
    }
  };

  this.collide = function(other_thing) {
    if(Object.getPrototypeOf(other_thing) === Invader.prototype) {
      this.box.make_unhittable();
      this.active = false;
    }
  };

  return this;
}
