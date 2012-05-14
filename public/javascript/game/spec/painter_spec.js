describe("Painter", function() {
  var painter;

  beforeEach(function() {
    // TODO: Verifying the stub context is even being used...
    var stub_context = {};
    painter = new Painter(stub_context);
  });

  it("should be able to draw a bullet", function() {
    painter.draw_bullet(0, 0);
  });
});
