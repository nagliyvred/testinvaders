function Tank(bullet) {
  var width = 66;
  var height = 42;

  this.box = new BoundingBox(0, 500, width, height);
  this.active = true;

  this.update = function(dt, input) {
    this.box.x = input.mouse.x - (this.box.width / 2);

    if (input.pressed("shoot")) {
      if (!bullet.active) {
        bullet.shoot(-200, input.mouse.x, this.box.y, this);
      }
    }
  };

  this.collide = function() {
  };

  return this;
}
