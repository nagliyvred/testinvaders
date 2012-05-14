function Painter(context, gfx) {
  this.draw_bullet = function(x, y) {
    context.drawImage(gfx.tank_bullet, x, y);
  };

  return this;
}
