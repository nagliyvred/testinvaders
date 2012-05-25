describe("Given a Game", function() {
  var game, painter, thing, collision;

  beforeEach(function() {
    painter = {
      id: "Stub Painter",
      clear: jasmine.createSpy('painter.clear'),
      draw: jasmine.createSpy('painter.draw')
    };
    thing = {
      id: "Stub Thing",
      update: jasmine.createSpy('update'),
      collide: jasmine.createSpy('collide'),
      box: {is_colliding_with: jasmine.createSpy('box_is_colliding_with') }
    };
    other_thing = {
      id: "Stub Other Thing",
      update: jasmine.createSpy('update'),
      collide: jasmine.createSpy('collide'),
      box: {is_colliding_with: jasmine.createSpy('box_is_colliding_with') }
    };

    game = new Game(painter, [thing, other_thing]);
  });

  describe("when checking for collisions", function() {
    it("should check that everything is colliding with everything else", function () {
      game.check_for_collisions();

      expect(thing.box.is_colliding_with).toHaveBeenCalledWith(other_thing.box);
      expect(other_thing.box.is_colliding_with).toHaveBeenCalledWith(thing.box);
    });

    it("should call collide on both things if they collide", function() {
      thing.box.is_colliding_with.andReturn(true);

      game.check_for_collisions();

      expect(thing.collide).toHaveBeenCalledWith(other_thing);
      expect(other_thing.collide).toHaveBeenCalledWith(thing);
    });

    it("shouldn't call collide if things aren't colliding", function() {
      game.check_for_collisions();

      expect(thing.collide).not.toHaveBeenCalledWith(other_thing);
      expect(other_thing.collide).not.toHaveBeenCalledWith(thing);
    });
  });

  describe("when it is drawing", function() {
    it("then it should clear the canvas", function() {
      game.draw();
      expect(painter.clear).toHaveBeenCalled();
    });

    it("then ALL THE THINGS should be drawn", function() {
      game.draw();
      expect(painter.draw).toHaveBeenCalledWith(thing);
      expect(painter.draw).toHaveBeenCalledWith(other_thing);
    });
  });

  describe("when it is updating", function() {
    it("then ALL THE THINGS should be updated", function() {
      var dt = Math.random();
      game.update(dt);
      expect(thing.update).toHaveBeenCalledWith(dt, atom.input);
      expect(other_thing.update).toHaveBeenCalledWith(dt, atom.input);
    });

    it("then ALL THE THINGS should check for collisions", function() {
      spyOn(game, 'check_for_collisions');

      game.update();
      expect(game.check_for_collisions).toHaveBeenCalled();
    });
  });
});
