/* HI */

function Init() {
  var bullet = new Bullet(0, 0, 0);
  bullet.shoot(5, 200, 200);

  var gfx = new Gfx();
  var painter = Painter(atom.context, gfx);

  var game = new Game(painter, [bullet]);
  game.run();
}
