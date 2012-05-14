function Tank() {
  var x = 0;

  this.update = function(dt, input) {
    x = input.mouse.x;
  };

  this.box = function() {
    return {
      x: x,
      y: 500,
      width: 10,
      height: 10
    };
  };

  this.draw = function(painter) {
    painter.draw_tank(x, 500);
  };

  return this;
};
