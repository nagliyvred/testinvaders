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

  this.draw_bullet = function(position) {
    context.drawImage(this.images.tank_bullet, position.x, position.y);
  };

  this.draw_invader_bullet = function(position) {
    context.drawImage(this.images.invader_bullet, position.x, position.y);
  };

  this.draw_tank = function(position) {
    context.drawImage(this.images.tank, position.x, position.y);
  };

  this.draw_invader = function(position) {
    context.drawImage(this.images.invader, position.x, position.y);
  };

  this.clear = function() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  return this;
}
