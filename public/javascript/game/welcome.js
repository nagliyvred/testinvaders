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
  for(var y = 0; y < 5; y++) {
    for(var x = 0; x < 10; x++) {
      var invader_bullet = new InvaderBullet();
      things.push(invader_bullet);

      var invader = new Invader(50, x * 70, y * 60, 20 - (Math.random() * 20), invader_bullet);
      invaders.push(invader);
      things.push(invader);
    }
  }

  var swarm = new Swarm(invaders, 800);
  things.push(swarm);

  var game = new Game(painter, things);
  game.run();
}
