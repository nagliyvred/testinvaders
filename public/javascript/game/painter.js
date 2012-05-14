function Painter(context, gfx) {
  this.draw_bullet = function(x, y) {
    context.drawImage(gfx.tank_bullet, x, y);
  };

  this.clear = function() {
    context.fillStyle = "black";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  return this;
}
