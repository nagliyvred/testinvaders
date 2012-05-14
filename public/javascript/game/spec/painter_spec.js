describe("Painter", function() {
  var stub_tank_bullet_image = "stub_tank_bullet_image";
  var stub_gfx = {tank_bullet: stub_tank_bullet_image};

  var x, y;

  beforeEach(function() {
    x = Math.random();
    y = Math.random();
  });

  describe("drawing bullets", function() {

    it("should draw the tank bullet image at the specified position", function() {
      var spy_drawImage = jasmine.createSpy("drawImage");
      var stub_canvas = {drawImage: spy_drawImage};

      var painter = new Painter(stub_canvas, stub_gfx);
      painter.draw_bullet(x, y);

      expect(spy_drawImage).toHaveBeenCalledWith(stub_tank_bullet_image, x, y);
    });

  });

});
