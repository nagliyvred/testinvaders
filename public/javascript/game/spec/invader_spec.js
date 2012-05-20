describe("Invader", function() {
  var invader;
  var velocity, x, y;

  beforeEach(function() {
    velocity = Math.random();
    x = Math.random();
    y = Math.random();

    invader = new Invader(velocity, x, y);
  });

  it("should be hittable", function() {
    var box = invader.box;

    expect(box.x).toEqual(x);
    expect(box.y).toEqual(y);
    expect(box.height).toBeGreaterThan(0);
    expect(box.width).toBeGreaterThan(0);
  });

  it("should look like blatant copyright infringement", function() {
    var stub_painter = {draw_invader: jasmine.createSpy("stub_painter.draw_invader")};
    invader.draw(stub_painter);
    expect(stub_painter.draw_invader).toHaveBeenCalledWith(x, y);
  });

  describe("when updated", function() {
    var stub_input = {};

    beforeEach(function() {
      invader.update(1, stub_input);
    });

    it("should move laterally", function() {
      var new_box = invader.box;

      expect(new_box.x).toEqual(x + velocity);
      expect(new_box.y).toEqual(y);
    });
  });

  describe("when told to invade", function() {
    xit("should move toward the player's tank");
    xit("should invert its lateral velocity");
  });
});
