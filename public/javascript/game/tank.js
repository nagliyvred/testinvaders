function Tank(bullet) {
  var x = 0;
  var y = 500;
  var width = 66;
  var height = 42;

  this.update = function(dt, input) {
    x = input.mouse.x - (width / 2);

    if (input.pressed("shoot")) {
      bullet.shoot(-200, input.mouse.x, y);
    }
  };

  this.box = function() {
    return {
      x: x,
      y: y,
      width: width,
      height: height
    };
  };

  this.draw = function(painter) {
    painter.draw_tank(x, 500);
  };

  return this;
};
