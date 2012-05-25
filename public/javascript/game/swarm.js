function Swarm(invaders, zone_width) {
  var left = -1;
  var right = 1;
  this.direction = right;
  this.box = new BoundingBox(new Position(0, 0), 0, 0);

  var invader_width = invaders[0].box.width;

  var min = function(array) {
    return Math.min.apply(Math, array);
  };

  var max = function(array) {
    return Math.max.apply(Math, array);
  };

  var collect_invader_x_positions = function() {
    return invaders.filter(function(invader) {
      return invader.box.is_hittable();
    }).map(function(invader) {
      return invader.position.x;
    });
  };

  this.update = function() {
    var min_x = min(collect_invader_x_positions());
    var max_x = max(collect_invader_x_positions()) + invader_width;

    // If the swarm hits the edge of the zone its moving towards, INVADE!
    if(((this.direction == right) && (max_x >= zone_width)) ||
       ((this.direction == left) && (min_x <= 0))) {

      for(var i = 0; i < invaders.length; i++) {
        invaders[i].invade();
      }

      this.direction = this.direction == right ? left : right;
    }
  };

  this.collide = function() { };
  this.draw = function() { };

  return this;
}
