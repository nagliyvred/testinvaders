function Init() {
  var game = new Game();
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
