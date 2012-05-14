function Gfx() {

  var image = function(id) {
    return document.getElementById(id);
  };

  this.tank = image("img_tank");
  this.invader = image("img_invader");
  this.tank_bullet = image("img_tank_bullet");
  this.invader_bullet = image("img_invader_bullet");

  return this;
}
