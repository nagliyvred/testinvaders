function Tank(bullet) {
  var x = 0;
  var y = 500;
  var width = 66;
  var height = 42;
  var box = new BoundingBox(x, y, width, height) ;

  this.update = function(dt, input) {
    box.x = input.mouse.x - (width / 2);

    if (input.pressed("shoot")) {
      bullet.shoot(-200, input.mouse.x, y);
    }
  };

  this.box = function() {
    return box;
  };

  this.draw = function(painter) {
    painter.draw_tank(x, 500);
  };

  this.collide = function() {
  };

  return this;
};
