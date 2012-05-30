describe("Tank", function() {
  var stub_bullet = {active: false};
  var tank;

  beforeEach(function() {
    tank = new Tank(stub_bullet);
  });

  describe("when a tank is created", function() {
    it("should be active", function() {
      expect(tank.active).toBeTruthy();
    });

    it("should start in the middle of the zone", function() {
      expect(tank.box.y).toEqual(500);
    });

    it("should be on the Earth team", function() {
      expect(tank.team).toEqual(Team.Earth);
    });
  });

  describe("when tank is in a collision", function() {
    // TODO: Implement this when we have time.
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
      expect(box.x).toEqual(input.mouse.x - (box.width / 2));
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

      stub_bullet.active = true;
      stub_bullet.shoot = jasmine.createSpy("stub_bullet.shoot");
      tank.update(0, input);

      expect(stub_bullet.shoot).not.toHaveBeenCalled();
    });
  });
});
