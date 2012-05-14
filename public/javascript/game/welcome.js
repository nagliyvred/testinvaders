/* HI */

function Init() {
  var gfx = new Gfx();
  var painter = new Painter(atom.context, gfx);

  var tank = new Tank();

  var invader = new Invader();
  var swarm = new Swarm([invader]);

  var game = new Game(painter, [tank, invader]);
  game.run();
}
