describe("Tank", function() {
  var stub_bullet = {};
  var input = {
    mouse: {
      x: Math.random()
    }
  };
  var tank;

  beforeEach(function() {
    tank = new Tank(stub_bullet);
  });

  it("should look like a tank", function() {
    var stub_painter = {draw_tank: jasmine.createSpy('stub_painter.draw_tank')};
    tank.draw(stub_painter);
    expect(stub_painter.draw_tank).toHaveBeenCalledWith(0, 500);
  });

  describe("when the tank has been updated", function() {
    beforeEach(function() {
      tank.update(0, input);
    });

    it("should set the tank position based on the mouse", function() {
      expect(tank.box().x).toEqual(input.mouse.x);
    });
  });
});
