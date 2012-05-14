function Tank() {
  var x = 0;
  var width = 66;
  var height = 42;

  this.update = function(dt, input) {
    x = input.mouse.x - (width / 2);
  };

  this.box = function() {
    return {
      x: x,
      y: 500,
      width: width,
      height: height
    };
  };

  this.draw = function(painter) {
    painter.draw_tank(x, 500);
  };

  return this;
};
