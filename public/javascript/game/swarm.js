function Swarm(invaders, zone_width) {

  this.update = function() {

    var min_x = invaders.reduce(function(current_min, invader_i) {
      return invader_i.position.x < current_min ? invader_i.position.x : current_min;
    }, zone_width);

    var max_x = invaders.reduce(function(current_max, invader_i) {
      return invader_i.position.x > current_max ? invader_i.position.x : current_max;
    }, 0);

    if(((max_x + 100) >= zone_width) || (min_x <= 0)) {
      for(var i = 0; i < invaders.length; i++) {
        invaders[i].invade();
      }
    }
  };

  return this;
}
