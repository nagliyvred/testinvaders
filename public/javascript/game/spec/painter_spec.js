describe("Painter", function() {
  var stub_canvas = {
    width: Math.random(),
    height: Math.random()
  };
  var stub_context, painter;
  var x, y;

  beforeEach(function() {
    stub_context = {
      canvas: stub_canvas,
      drawImage: jasmine.createSpy("stub_context.drawImage"),
      fillRect: jasmine.createSpy("stub_context.clearRect")
    };
    painter = new Painter(stub_context);
    painter.images = {
      tank_bullet: "stub_image_tank_bullet",
      tank: "stub_image_tank",
      invader: "stub_image_invader",
      invader_bullet: "stub_image_invader_bullet"
    };
    x = Math.random();
    y = Math.random();
  });

  describe("drawing a bullet", function() {
    it("should draw the tank bullet image at the specified position", function() {
      var bullet = new Bullet();
      bullet.box.x = x;
      bullet.box.y = y;
      bullet.shoot(0, x, y);

      painter.draw(bullet);

      expect(stub_context.drawImage).toHaveBeenCalledWith(painter.images.tank_bullet, x, y);
    });
  });

  describe("drawing an invader_bullet", function() {
    it("should draw the invader bullet at the specified position", function() {
      var bullet = new InvaderBullet();
      bullet.box.x = x;
      bullet.box.y = y;
      bullet.shoot(0, x, y);

      painter.draw(bullet);

      expect(stub_context.drawImage).toHaveBeenCalledWith(painter.images.invader_bullet, x, y);
    });
  });

  describe("drawing the tank", function() {
    it("should draw the tank image at the specified position", function() {
      var tank = new Tank();
      tank.box.x = x;
      tank.box.y = y;

      painter.draw(tank);

      expect(stub_context.drawImage).toHaveBeenCalledWith(painter.images.tank, x, y);
    });
  });

  describe("drawing an invader", function() {
    it("should draw the invader image at the specified position", function() {
      var invader = new Invader();
      invader.box.x = x;
      invader.box.y = y;

      painter.draw(invader);

      expect(stub_context.drawImage).toHaveBeenCalledWith(painter.images.invader, x, y);
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
