function Tank(bullet) {
  var width = 66;
  var height = 42;
  var initial_y = 500;

  this.box = new BoundingBox(0, initial_y, width, height);
  this.active = true;

  this.collide = function() {
    // TODO: Implement tank collisions or else
    // the tank is invincible... that might be fun.
  };

  this.update = function(delta_time, input) {
    this.box.x = input.mouse.x - (this.box.width / 2);

    if (input.pressed("shoot")) {
      if (!bullet.active) {
        bullet.shoot(-200, input.mouse.x, this.box.y, this);
      }
    }
  };

  return this;
}
