function Tank(bullet) {
  var x = 0;
  var y = 500;
  var width = 66;
  var height = 42;

  this.position = {x: x, y: y};
  this.box = new BoundingBox(this.position, width, height);

  this.update = function(dt, input) {
    this.position.x = input.mouse.x - (this.box.width / 2);

    if (input.pressed("shoot")) {
      bullet.shoot(-200, input.mouse.x, this.position.y, this);
    }
  };

  this.draw = function(painter) {
    painter.draw_tank(this.position);
  };

  this.collide = function() {
  };

  return this;
}
