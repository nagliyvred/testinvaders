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
    if(thing.__proto__ == Bullet.prototype) {
      if(thing.owner.__proto__ == Tank.prototype) {
        context.drawImage(this.images.tank_bullet, thing.position.x, thing.position.y);
      } else {
        context.drawImage(this.images.invader_bullet, thing.position.x, thing.position.y);
      }
    }
    else if(thing.__proto__ == Tank.prototype) {
      context.drawImage(this.images.tank, thing.position.x, thing.position.y);
    }
    else if(thing.__proto__ == Invader.prototype) {
      context.drawImage(this.images.invader, thing.position.x, thing.position.y);
    }
  };

  this.clear = function() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  return this;
}
