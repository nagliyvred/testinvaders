describe("Swarm", function() {

  var invaders;
  var swarm;
  var zone_width = 800;
  var direction = 1;

  var stub_invader = function(x, is_hittable) {
    return {
      invade: jasmine.createSpy("invader_invade"),
      position: {x: x},
      box: {
        width: 100,
        is_hittable: jasmine.createSpy("invader_is_hittable").andReturn(is_hittable)
     }
    };
  };

  describe("swarm collisions", function() {
    it("the swarm should not be hittable", function() {
      invaders = [stub_invader(0, true)];
      swarm = new Swarm(invaders, zone_width);

      expect(swarm.box.is_hittable()).toBeFalsy();
    });
  });

  describe("when invaders aren't hitting the edge of the screen", function() {
    it("should not tell the invaders to INVADE", function() {
      invaders = [stub_invader(600, true)];
      swarm = new Swarm(invaders, zone_width);
      swarm.update();

      expect(invaders[0].invade).not.toHaveBeenCalled();
    });
  });

  describe("dead invaders colliding with the zone edge", function() {
    it("should not tell the invaders to INVADE", function() {
      invaders = [stub_invader(700, false)];
      swarm = new Swarm(invaders, zone_width);
      swarm.update();

      expect(invaders[0].invade).not.toHaveBeenCalled();
    });
  });

  describe("when the swarm is moving right", function() {
    describe("when one of the invaders hits the right edge of the screen", function() {
      beforeEach(function() {
        invaders = [stub_invader(600, true), stub_invader(700, true)];
        swarm = new Swarm(invaders, zone_width);
        swarm.update();
      });

      it("should tell all the invaders to INVADE", function() {
        expect(invaders[0].invade).toHaveBeenCalled();
        expect(invaders[1].invade).toHaveBeenCalled();
      });

      it("should change direction to move left", function() {
        expect(swarm.direction).toBe(-1);
      });
    });

    describe("when one of the invaders is hitting the left edge of the screen", function() {
      beforeEach(function() {
        invaders = [stub_invader(0, true)];
        swarm = new Swarm(invaders, zone_width);
        swarm.update();
      });

      it("should not tell the invaders to INVADE", function() {
        expect(invaders[0].invade).not.toHaveBeenCalled();
      });
    });
  });

  describe("when the swarm is moving left", function() {
    beforeEach(function() {
      invaders = [stub_invader(0, true)];
      swarm = new Swarm(invaders, zone_width);
      swarm.direction = -1;
      swarm.update();
    });

    describe("when one of the invaders hits the left edge of the screen", function() {
      it("should tell the invaders to INVADE", function() {
        expect(invaders[0].invade).toHaveBeenCalled();
      });

      it("should change direction to move left", function() {
        expect(swarm.direction).toBe(1);
      });
    });
  });
});
