/* HI */

function Init() {
  var gfx = new Gfx();
  var painter = new Painter(atom.context, gfx);

  var tank = new Tank();
  var swarm = new Swarm([]);

  var game = new Game(painter, [tank, swarm]);
  game.run();
}
