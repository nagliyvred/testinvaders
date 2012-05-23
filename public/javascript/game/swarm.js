function Swarm(invaders, zone_width, initial_direction) {
  this.direction = initial_direction;
  this.box = new BoundingBox(new Position(0, 0), 0, 0);

  var min = function(array) {
    return Math.min.apply(Math, array);
  };

  var max = function(array) {
    return Math.max.apply(Math, array);
  };

  var collect_invader_x_positions = function() {
    return invaders.map(function(invader) {
      return invader.position.x;
    });
  };

  this.update = function() {

    var min_x = min(collect_invader_x_positions());
    var max_x = max(collect_invader_x_positions());

    // If the swarm hits the edge of the zone, INVADE!
    if(((max_x + invaders[0].box.width) >= zone_width) || (min_x <= 0)) {
      for(var i = 0; i < invaders.length; i++) {
        invaders[i].invade();
      }
      this.direction = this.direction * -1;
    }
  };

  this.collide = function() { };
  this.draw = function() { };

  return this;
}
