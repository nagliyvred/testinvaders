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

  var things = [bullet, tank];

  var invaders = [];
  for(var i = 0; i < 3; i++) {
    var invader_bullet = new Bullet();
    things.push(invader_bullet);

    var invader = new Invader(50, i * 80, 50, 4 - (Math.random() * 4), invader_bullet);
    invaders.push(invader);
    things.push(invader);
  }

  var swarm = new Swarm(invaders);

  var game = new Game(painter, things);
  game.run();
}
