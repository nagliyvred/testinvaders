function Tank(bullet) {
  var x = 0;
  var y = 500;
  var width = 66;
  var height = 42;

  this.x = 0;
  this.y = 500;
  this.box = new BoundingBox(this, width, height);

  this.update = function(dt, input) {
    this.x = input.mouse.x - (this.box.width / 2);

    if (input.pressed("shoot")) {
      bullet.shoot(-200, input.mouse.x, this.y, this);
    }
  };

  this.draw = function(painter) {
    painter.draw_tank(this);
  };

  this.collide = function() {
  };

  return this;
}
