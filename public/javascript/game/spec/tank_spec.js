describe("Tank", function() {
  var stub_bullet = {id: "stub_bullet", this.active: false, is_active: function(){return this.active}};
  var tank;

  beforeEach(function() {
    tank = new Tank(stub_bullet);
  });

  it("should be active", function() {
    expect(tank.active).toBeTruthy();
  });

  describe("when the tank has been updated", function() {
    var input = {
      mouse: {
        x: Math.random()
      },
      pressed: function() {}
    };

    beforeEach(function() {
      tank.update(0, input);
    });

    it("should set the tank position based on the mouse", function() {
      var box = tank.box;
      expect(box.position.x).toEqual(input.mouse.x - (box.width / 2));
    });
  });

  describe("when the player clicks their mouse", function() {
    var input = {
      mouse: {
        x: 0
      },
      pressed: function(e) {
        return e == "shoot";
      }
    };

    it("should shoot", function() {
      stub_bullet.shoot = jasmine.createSpy("stub_bullet.shoot");
      tank.update(0, input);
      expect(stub_bullet.shoot).toHaveBeenCalledWith(-200, 0, 500, tank);
    });

    it("should not shoot if the current bullet is still active", function() {
      tank.update(0, input)

      stub_bullet.shoot = jasmine.createSpy("stub_bullet.shoot");
      tank.update(0, input);
      expect(stub_bullet.shoot).not.toHaveBeenCalled();
    });
  });
});
