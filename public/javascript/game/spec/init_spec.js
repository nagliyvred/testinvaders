describe("Game", function() {
  var game, painter, thing;

  beforeEach(function() {
    painter = {id: "Stub Painter"};
    thing = {
      id: "Stub Thing",
      draw: jasmine.createSpy('thing.draw'),
      update: jasmine.createSpy('update')
    };

    game = new Game(painter, [thing]);
  });

  it("should draw ALL THE THINGS", function() {
    game.run();
    expect(thing.draw).toHaveBeenCalledWith(painter);
  });

  it("should update ALL THE THINGS", function() {
    game.run();
    expect(thing.update).toHaveBeenCalledWith(0);
  });
});
