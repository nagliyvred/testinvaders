function Game(painter, collision, things) {
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
        if (thing === other_thing) {
          return ;
        }

        //this line is only here so I know my test is right
        have_collided(thing.box, other_thing.box);
        //this is what it probably will be.
        //if (have_collided(thing.box, other_thing.box)) {
          //thing.collide();
          //other_thing.collide();
        //}
      });
    });
  };
  
  return _this;
}
