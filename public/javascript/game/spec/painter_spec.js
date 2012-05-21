describe("Painter", function() {
  var stub_canvas = {
    width: Math.random(),
    height: Math.random()
  };
  var stub_gfx = {
    tank_bullet: "stub_gfx_tank_bullet",
    tank: "stub_gfx_tank",
    invader: "stub_gfx_invader"
  };
  var stub_context, painter;

  beforeEach(function() {
    stub_context = {
      canvas: stub_canvas,
      drawImage: jasmine.createSpy("stub_context.drawImage"),
      fillRect: jasmine.createSpy("stub_context.clearRect")
    };
    painter = new Painter(stub_context, stub_gfx);
  });

  describe("draw_bullet", function() {
    it("should draw the tank bullet image at the specified position", function() {
      var x = Math.random();
      var y = Math.random();
      var position = new Position(x, y) ;

      painter.draw_bullet(position);

      expect(stub_context.drawImage).toHaveBeenCalledWith(stub_gfx.tank_bullet, position.x, position.y);
    });
  });

  describe("draw_tank", function() {
    it("should draw the tank image at the specified position", function() {
      var x = Math.random();
      var y = Math.random();
      var position = new Position(x, y) ;

      painter.draw_tank(position);

      expect(stub_context.drawImage).toHaveBeenCalledWith(stub_gfx.tank, x, y);
    });
  });

  describe("draw_invader", function() {
    it("should draw the invader image at the specified position", function() {
      var x = Math.random();
      var y = Math.random();
      var position = new Position(x, y) ;

      painter.draw_invader(position);

      expect(stub_context.drawImage).toHaveBeenCalledWith(stub_gfx.invader, x, y);
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
