describe("Swarm", function() {
  var invaders;
  var swarm;
  var zone_width = 800;
  var direction = 1;

  beforeEach(function() {
    invaders = [
      {
        invade: jasmine.createSpy("invader_invade"),
        position: new Position(600, 0),
        box: { width: 100, is_hittable: jasmine.createSpy("is_hittable").andReturn(true) }
      }
    ];
    swarm = new Swarm(invaders, zone_width);
  });

  describe("collisions", function() {
    it("should not be hittable", function() {
      expect(swarm.box.is_hittable()).toBeFalsy();
    });
  });

  describe("when none of the invaders are hitting the edge of the screen", function() {
    it("should not tell the invaders to INVADE", function() {
      swarm.update();

      expect(invaders[0].invade).not.toHaveBeenCalled();
    });
  });

  describe("when the swarm is moving right", function() {
    beforeEach(function() {
      swarm.direction = 1;
    });
    describe("when one of the invaders hits the right edge of the screen", function() {
      beforeEach(function() {
        invaders.push(
          {
            invade: jasmine.createSpy("invader_invade"),
            position: new Position(0, 0),
            box: { width: 100, is_hittable: jasmine.createSpy("is_hittable").andReturn(true) }
          }
        );
      });
      it("should tell all the invaders to INVADE", function() {
        swarm.update();

        expect(invaders[0].invade).toHaveBeenCalled();
        expect(invaders[1].invade).toHaveBeenCalled();
      });
      it("should change direction to move left", function() {
        swarm.update();

        expect(swarm.direction).toBe(-1);
      });
    });
    describe("when one of the invaders hits the left edge of the screen", function() {
      beforeEach(function() {
        invaders = [
          {
            invade: jasmine.createSpy("invader_invade"),
            position: new Position(0, 0),
            box: { width: 100, is_hittable: jasmine.createSpy("is_hittable").andReturn(true) }
          }
        ];
      });
      it("should not tell the invaders to INVADE", function() {
        swarm.update();

        expect(invaders[0].invade).not.toHaveBeenCalled();
      });
    });
  });

  describe("when the swarm is moving left", function() {
    beforeEach(function() {
      swarm.direction = -1;
    });
    describe("when one of the invaders hits the left edge of the screen", function() {
      beforeEach(function() {
        invaders.push(
          {
            invade: jasmine.createSpy("invader_invade"),
            position: new Position(700, 0),
            box: { width: 100, is_hittable: jasmine.createSpy("is_hittable").andReturn(true) }
          }
        );
      });
      it("should tell all the invaders to INVADE", function() {
        swarm.update();

        expect(invaders[0].invade).toHaveBeenCalled();
        expect(invaders[1].invade).toHaveBeenCalled();
      });
      it("should change direction to move left", function() {
        swarm.update();

        expect(swarm.direction).toBe(1);
      });
      describe("if the invader is dead", function() {
        it("shoud not tell the invaders to INVADE", function() {
          invaders[0].box.is_hittable = jasmine.createSpy("is_hittable").andReturn(false);

          expect(invaders[0].invade).not.toHaveBeenCalled();
        });
      });
    });
  });

});
