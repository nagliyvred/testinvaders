/* HI */

function Init() {
  var gfx = new Gfx();
  var painter = new Painter(atom.context, gfx);

  var bullet = new Bullet();
  var tank = new Tank(bullet);

  var game = new Game(painter, [tank, bullet]);
  game.run();
}
