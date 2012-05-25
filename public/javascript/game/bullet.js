function Bullet() {
  var width = 4;
  var height = 20;
  var velocity = 0;

  this.active = false;
  this.box = new BoundingBox(0, 0, 0, 0);

  this.shoot = function(new_velocity, new_x, new_y, owner) {
    velocity = new_velocity;
    this.box.set(new_x, new_y, width, height);
    this.owner = owner;
    this.active = true;
  };

  this.update = function(delta_time) {
    this.box.y = this.box.y + (delta_time * velocity);

    if (this.box.y < 0) {
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
