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
      update: jasmine.createSpy('update'),
      collide: jasmine.createSpy('collide')
    };

    collision = new Collision();
    game = new Game(painter, collision, [thing]);
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
    var other_thing;
    beforeEach(function() {
      other_thing = {
        id: "Stub Thing",
        draw: jasmine.createSpy('thing.draw'),
        update: jasmine.createSpy('update'),
        collide: jasmine.createSpy('collide')
      }; 
    });

    it("should not check a thing against itself", function () {
      spyOn(collision, "have_collided");

      game.update();
      expect(collision.have_collided).not.toHaveBeenCalled();
    });

    it("should call have_collided", function() {
      game = new Game(painter, collision, [thing, other_thing]);

      spyOn(collision, "have_collided");

      game.check_for_collisions();
      expect(collision.have_collided).toHaveBeenCalledWith(thing.box, other_thing.box); 
    });

    it("should call collide on both things if they collide", function() {
      game = new Game(painter, collision, [thing, other_thing]);

      spyOn(collision, "have_collided").andReturn(true);

      game.check_for_collisions();
      expect(thing.collide).toHaveBeenCalled();
      expect(other_thing.collide).toHaveBeenCalled();
    });

    it("should not call collide IF THERE IS NO COLLISION", function() {
      game = new Game(painter, collision, [thing, other_thing]);

      spyOn(collision, "have_collided").andReturn(false);

      game.check_for_collisions();
      expect(thing.collide).not.toHaveBeenCalled();
      expect(other_thing.collide).not.toHaveBeenCalled();
    });
  });

  it("should clear the canvas between frames of animation", function() {
    game.draw();
    expect(painter.clear).toHaveBeenCalled();
  });
});
