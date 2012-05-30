function Bullet() {
  var width = 4, height = 20;
  var velocity = 0;

  this.team = Team.Earth;
  this.active = false;
  this.box = new BoundingBox(0, 0, width, height);

  this.shoot = function(new_velocity, new_x, new_y, owner) {
    velocity = new_velocity;
    this.box.x = new_x;
    this.box.y = new_y;
    this.owner = owner;
    this.active = true;
  };

  this.update = function(delta_time) {
    this.box.y = this.box.y + (delta_time * velocity);

    if (this.box.y < 0) {
      this.active = false;
    }
  };

  this.collide = function(other_thing) {
    if(Object.getPrototypeOf(other_thing) === Invader.prototype) {
      this.active = false;
    }
  };

  this.shooter_is = function(type) {
    return (Object.getPrototypeOf(this.owner) == type.prototype);
  };

  return this;
}
