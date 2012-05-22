function Swarm(invaders, zone_width) {
  this.box = new BoundingBox(new Position(0, 0), 0, 0);

  this.update = function() {

    // Find the furtherest left point of the swarm
    var min_x = invaders.reduce(function(current_min, invader_i) {
      if(invader_i.position.x < current_min && invader_i.box.is_hittable()) {
        return invader_i.position.x;
      }
      return current_min;
    }, zone_width);

    // Find the furtherest right point of the swarm
    var max_x = invaders.reduce(function(current_max, invader_i) {
      if(invader_i.position.x > current_max && invader_i.box.is_hittable()) {
        return invader_i.position.x;
      }
      return current_max;
    }, 0);

    // If the swarm hits the edge of the zone, INVADE!
    if(((max_x + invaders[0].box.width) >= zone_width) || (min_x <= 0)) {
      for(var i = 0; i < invaders.length; i++) {
        invaders[i].invade();
      }
    }
  };

  this.collide = function() { };
  this.draw = function() { };

  return this;
}
