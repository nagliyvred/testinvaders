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
      collide: jasmine.createSpy('collide'),
      box: {is_colliding_with: jasmine.createSpy('box_is_colliding_with') }
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
    xit("should check that everything is colliding with everything else");
    xit("should call collide on both things if they collide");
    xit("shouldn't call collide if things aren't colliding");
  });

  it("should clear the canvas between frames of animation", function() {
    game.draw();
    expect(painter.clear).toHaveBeenCalled();
  });
});
