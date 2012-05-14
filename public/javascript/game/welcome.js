/* HI */

function Init() {
  var bullet = new Bullet(0, 0, 0);
  bullet.shoot(5, 200, 200);

  var painter = Painter(atom.context);

  var game = new Game(painter, [bullet]);
  game.run();
}
