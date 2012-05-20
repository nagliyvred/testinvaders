function Tank(bullet) {
  var x = 0;
  var y = 500;
  var width = 66;
  var height = 42;

  this.box = new BoundingBox(x, y, width, height) ;

  this.update = function(dt, input) {
    this.box.x = input.mouse.x - (this.box.width / 2);

    if (input.pressed("shoot")) {
      //TODO: remove 25; this is arbitary offset until we make the tank bullet a seperate 
      //concept. if we don't do the offset then it collides with the tank immediately
      bullet.shoot(-200, input.mouse.x, this.box.y - 25);
    }
  };

  this.draw = function(painter) {
    painter.draw_tank(this.box.x, this.box.y);
  };

  this.collide = function() {
  };

  return this;
};
