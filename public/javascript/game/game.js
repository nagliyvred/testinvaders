function Game(painter, things) {
  var _this = new atom.Game();

  _this.draw = function() {
    painter.clear();
    things.forEach(function(thing) {
      thing.draw(painter);
    });
  };

  _this.update = function(dt) {
    things.forEach(function(thing) {
      thing.update(dt, atom.input);
    });

    this.check_for_collisions();
  };

  _this.check_for_collisions = function() {
    things.forEach(function(thing) {
      things.forEach(function(other_thing) {
        if(thing.box.is_colliding_with(other_thing.box)) {
          thing.collide(other_thing);
          other_thing.collide(thing);
        }
      });
    });
  };

  return _this;
}
