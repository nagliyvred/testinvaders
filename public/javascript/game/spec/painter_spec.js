describe("Painter", function() {
  var stub_canvas = {
    width: Math.random(),
    height: Math.random()
  };
  var stub_gfx = {tank_bullet: "stub_tank_bullet_image"};
  var stub_context, painter;

  beforeEach(function() {
    stub_context = {
      canvas: stub_canvas,
      drawImage: jasmine.createSpy("stub_context.drawImage"),
      fillRect: jasmine.createSpy("stub_context.clearRect")
    };
    painter = new Painter(stub_context, stub_gfx);
  });

  describe("drawing bullets", function() {
    it("should draw the tank bullet image at the specified position", function() {
      var x = Math.random();
      var y = Math.random();

      painter.draw_bullet(x, y);

      expect(stub_context.drawImage).toHaveBeenCalledWith(stub_gfx.tank_bullet, x, y);
    });
  });

  describe("clear", function() {
    it("should blank the screen", function() {
      painter.clear();

      expect(stub_context.fillStyle).toEqual("black");
      expect(stub_context.fillRect).toHaveBeenCalledWith(0, 0, stub_canvas.width, stub_canvas.height);
    });
  });
});
