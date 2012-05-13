function Init() {
  var bullet = new Bullet(0, 0, 0);
  bullet.shoot(5, 200, 200)

  var game = new Game([bullet]);
  game.run();
}

function Game(things) {
  var _this = new atom.Game();

  _this.draw = function() {
    things.forEach(function(thing) {
      thing.draw();
    });
  };

  _this.update = function(dt) {
    things.forEach(function(thing) {
      thing.update(dt);
    });
  };

  return _this;
}
