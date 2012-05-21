function Painter(context, gfx) {
  this.draw_bullet = function(position) {
    context.drawImage(gfx.tank_bullet, position.x, position.y);
  };

  this.draw_tank = function(position) {
    context.drawImage(gfx.tank, position.x, position.y);
  }

  this.draw_invader = function(position) {
    context.drawImage(gfx.invader, position.x, position.y);
  }

  this.clear = function() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  return this;
}
