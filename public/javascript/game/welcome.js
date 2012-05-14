/*
 *
 * As for over here,
 * it's much harder to say.
 *
 */

function Init() {
  atom.input.bind(atom.button.LEFT, "shoot");

  var gfx = new Gfx();
  var painter = new Painter(atom.context, gfx);

  var bullet = new Bullet();
  var tank = new Tank(bullet);

  var invader = new Invader();
  var swarm = new Swarm([invader]);

  var game = new Game(painter, [bullet, tank, invader]);
  game.run();
}
