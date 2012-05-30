function Painter(context) {

  var find_image = function(id) {
    return document.getElementById(id);
  };

  this.images = {
    tank: find_image("img_tank"),
    invader: find_image("img_invader"),
    tank_bullet: find_image("img_tank_bullet"),
    invader_bullet: find_image("img_invader_bullet")
  };

  this.draw = function(thing) {
    if(Object.getPrototypeOf(thing) === Bullet.prototype) {
      if(thing.team == Team.Earth) {
        context.drawImage(this.images.tank_bullet, thing.box.x, thing.box.y);
      } else {
        context.drawImage(this.images.invader_bullet, thing.box.x, thing.box.y);
      }
    }
    else if(Object.getPrototypeOf(thing) === Tank.prototype) {
      context.drawImage(this.images.tank, thing.box.x, thing.box.y);
    }
    else if(Object.getPrototypeOf(thing) === Invader.prototype) {
      context.drawImage(this.images.invader, thing.box.x, thing.box.y);
    }
  };

  this.clear = function() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  return this;
}
