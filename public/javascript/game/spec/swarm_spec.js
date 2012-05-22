describe("Swarm", function() {
  var invaders;
  var swarm;
  var zone_width = 800;

  beforeEach(function() {
    invaders = [
      {
        invade: jasmine.createSpy("invader_invade"),
        position: new Position(600, 0),
        box: { width: 100 }
      }
    ];
    swarm = new Swarm(invaders, zone_width);
  });

  describe("when none of the invaders are hitting the edge of the screen", function() {
    it("should not tell the invaders to INVADE", function() {
      swarm.update();

      expect(invaders[0].invade).not.toHaveBeenCalled();
    });
  });

  describe("when one of the invaders hits the right edge of the screen", function() {
    beforeEach(function() {
      invaders.push(
        {
          invade: jasmine.createSpy("invader_invade"),
          position: new Position(0, 0),
          box: { width: 100 }
        }
      );
    });
    it("should tell all the invaders to INVADE", function() {
      swarm.update();

      expect(invaders[0].invade).toHaveBeenCalled();
      expect(invaders[1].invade).toHaveBeenCalled();
    });
  });

  describe("when one of the invaders hits the left edge of the screen", function() {
    beforeEach(function() {
      invaders.push(
        {
          invade: jasmine.createSpy("invader_invade"),
          position: new Position(700, 0),
          box: { width: 100 }
        }
      );
    });
    it("should tell all the invaders to INVADE", function() {
      swarm.update();

      expect(invaders[0].invade).toHaveBeenCalled();
      expect(invaders[1].invade).toHaveBeenCalled();
    });
  });
});
