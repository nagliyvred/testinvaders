describe("Bullet", function() {
  var bullet;

  beforeEach(function() {
    bullet = new Bullet();
  });

  function shared_initial_state_examples() {
    it("should not be active", function() {
      expect(bullet.active).toBeFalsy();
    });
  }

  shared_initial_state_examples();

  describe("when it is shot", function() {
    var velocity;
    var x;
    var y;
    var owner;

    beforeEach(function() {
      velocity = Math.random();
      x = Math.random();
      y = Math.random();
      owner = { };

      bullet.shoot(velocity, x, y, owner);
    });

    it("should move vertically at some velocity", function() {
      delta_time = Math.random();

      bullet.update(delta_time);

      expect(bullet.box.y).toEqual(y + (delta_time * velocity));
    });

    it("should be active", function() {
      expect(bullet.active).toBeTruthy();
    });

    it("should die when it goes off the top of the screen", function() {
      expect(bullet.active).toBeTruthy();

      bullet.box.y = -1;
      bullet.update(1);

      expect(bullet.active).toBeFalsy();
    });

    it("should set the owner of the bullet", function() {
      expect(bullet.owner).toBe(owner);
    });

    describe("when it is hit", function() {

      it("should not collide with the tank", function() {
        bullet.collide(new Tank());

        expect(bullet.active).toBeTruthy();
      });

      it("should collide with an invader", function() {
        bullet.collide(new Invader());

        expect(bullet.active).toBeFalsy();
        //shared_initial_state_examples();
      });
    });
  });
});
