describe("Game", function() {
  var game, painter, thing;

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

  it("should update ALL THE THINGS", function() {
    var dt = Math.random();
    game.update(dt);
    expect(thing.update).toHaveBeenCalledWith(dt);
  });

  it("should clear the canvas between frames of animation", function() {
    game.draw();
    expect(painter.clear).toHaveBeenCalled();
  });
});
