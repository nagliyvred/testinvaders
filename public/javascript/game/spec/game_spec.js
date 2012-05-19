describe("Game", function() {
  var game, painter, thing, collision;

  beforeEach(function() {
    painter = {
      id: "Stub Painter",
      clear: jasmine.createSpy('painter.clear')
    };
    thing = {
      id: "Stub Thing",
      draw: jasmine.createSpy('thing.draw'),
      update: jasmine.createSpy('update')
    };

    game = new Game(painter, [thing]);
  });

  it("should draw ALL THE THINGS", function() {
    game.draw();
    expect(thing.draw).toHaveBeenCalledWith(painter);
  });

  describe("during an update", function() {
    it("should update ALL THE THINGS", function() {
      var dt = Math.random();
      game.update(dt);
      expect(thing.update).toHaveBeenCalledWith(dt, atom.input);
    });

    it("should check ALL THE THINGS for collisions", function() {
      spyOn(game, 'check_for_collisions');

      game.update();
      expect(game.check_for_collisions).toHaveBeenCalled();
    });
  });

  describe("checking for collisions", function() {
    beforeEach(function() {
      collision = new Collision();
    });

    it("should not check a thing against itself", function () {
      spyOn(collision, "have_collided");

      game.update();
      expect(collision.have_collided).not.toHaveBeenCalled();
    });

    it("should call have_collided", function() {
      other_thing = {
        id: "Stub Thing",
        draw: jasmine.createSpy('thing.draw'),
        update: jasmine.createSpy('update')
      };
      game = new Game(painter, [thing, other_thing]);
      expect(false).toBe(true); 
    });

    it("should call collide on both things if they collide", function() {
      expect(false).toBe(true);
    });

    it("should not call collide IF THERE IS NO COLLISION", function() {
      expect(false).toBe(true);
    });
  });

  it("should clear the canvas between frames of animation", function() {
    game.draw();
    expect(painter.clear).toHaveBeenCalled();
  });
});
