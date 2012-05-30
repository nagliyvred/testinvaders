describe("Bullet", function() {
  var bullet;

  beforeEach(function() {
    bullet = new Bullet();
  });

  describe("when it has been created", function() {
    it("should not be active", function() {
      expect(bullet.active).toBeFalsy();
    });

    it("should be on the Earth team", function() {
      expect(bullet.team).toEqual(Team.Earth);
    });
  });

  describe("when it is shot", function() {
    var velocity;
    var x;
    var y;

    beforeEach(function() {
      velocity = Math.random();
      x = Math.random();
      y = Math.random();

      bullet.shoot(velocity, x, y);
    });

    it("should move vertically at some velocity", function() {
      delta_time = Math.random();

      bullet.update(delta_time);

      expect(bullet.box.y).toEqual(y + (delta_time * velocity));
    });

    it("should be active", function() {
      expect(bullet.active).toBeTruthy();
    });

    describe("when it goes off the top of the zone", function() {
      it("should be inactive", function() {
        bullet.box.y = -1;
        bullet.update(1);

        expect(bullet.active).toBeFalsy();
      });
    });

    describe("when it is in a collision", function() {

      it("it should still be active if it collides with the tank", function() {
        bullet.collide(new Tank());

        expect(bullet.active).toBeTruthy();
      });

      it("it should not be active if it collides with an invader", function() {
        bullet.collide(new Invader());

        expect(bullet.active).toBeFalsy();
      });
    });
  });
});
