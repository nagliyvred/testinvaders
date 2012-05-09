describe("Game", function() {
  var game;
  var things;
  var the_thing;

  beforeEach(function() {
    the_thing = {};
    things = [the_thing];
    game = new Game(things);
    the_thing.draw = jasmine.createSpy('the_thing_draw');
    the_thing.update = jasmine.createSpy('update');
  });

  it("should draw ALL THE THINGS", function() {
    game.run()
    expect(the_thing.draw).toHaveBeenCalled();
  });

  it("should update ALL THE THINGS", function() {
    game.run()
    expect(the_thing.update).toHaveBeenCalledWith(0);
  });
});
