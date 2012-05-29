describe("Invader", function() {
  var x, y;
  var velocity = 50;
  var invader;

  beforeEach(function() {
    x = Math.random();
    y = Math.random();

    invader = new Invader(x, y);
  });

  describe("when it has been created", function() {
    it("it should be alive", function() {
      expect(invader.active).toBeTruthy();
    });
  });

  describe("when it is involved in a collision", function() {
    var bullet_velocity;
    beforeEach(function() {
      bullet_velocity = 100;
    });
    it("should die if the collision is with a bullet from the tank", function() {
      var tank_bullet = new Bullet();
      tank_bullet.shoot(bullet_velocity, x, y, new Tank());

      invader.collide(tank_bullet);

      expect(invader.active).toBeFalsy();
    });

    it("should not die if the collision is with a with bullet from an invader", function() {
      var invader_bullet = new InvaderBullet();
      invader_bullet.shoot(bullet_velocity, x, y, new Invader());

      invader.collide(invader_bullet);

      expect(invader.active).toBeTruthy();
    });
  });


  describe("when updated", function() {
    var stub_input = {};

    it("should move laterally", function() {
      invader.update(1, stub_input);

      var new_box = invader.box;

      expect(new_box.x).toEqual(x + velocity);
      expect(new_box.y).toEqual(y);
    });

    describe("shooting a bullet", function() {

      var stub_bulllet;
      var shot_countdown;
      var time_elapsed_until_the_next_shot;
      var minimum_time_between_shots = 20;

      var elapse_shot_timer = function() {
        invader.update(time_elapsed_until_the_next_shot);
        time_elapsed_until_the_next_shot = minimum_time_between_shots;
      };

      beforeEach(function() {
        time_elapsed_until_the_next_shot = shot_countdown;
        shot_countdown = 20;

        stub_bullet = {shoot: jasmine.createSpy("stub_bullet.shoot")};
        invader = new Invader(x, y, stub_bullet);
      });

      it("should only shoot if it is active", function() {
        invader.active = false;
        elapse_shot_timer();
        expect(stub_bullet.shoot).not.toHaveBeenCalled();
      });

      describe("shooting when the timer has elapsed", function() {

        var width = 66, height = 48;
        beforeEach(function() {
          elapse_shot_timer();
        });

        it("should shoot a bullet when the shot timer elapses", function() {
          expect(stub_bullet.shoot).toHaveBeenCalled();
        });

        it("should shoot the bullet from the middle of the invader", function() {
          expect(stub_bullet.shoot).toHaveBeenCalledWith(jasmine.any(Number), x + (width / 2), y + (height / 2), invader);
        });

        it("should not shoot a bullet within twenty seconds of firing one before", function() {
          invader.update(19);
          expect(stub_bullet.shoot.callCount).toEqual(1);
        });

        it("should shoot a bullet every time the shot timer elapses", function() {
          elapse_shot_timer();

          expect(stub_bullet.shoot.callCount).toEqual(2);
        });
      });

      describe("shooting when time elapses in increments less than a full second", function() {
        it("should shoot a bullet when the minimum time elapses" , function() {
          invader.update(time_elapsed_until_the_next_shot - 1);
          invader.update(0.999);
          invader.update(0.010);

          expect(stub_bullet.shoot).toHaveBeenCalled();
        });
      });
    });
  });

  describe("when told to invade", function() {
    beforeEach(function() {
      invader.invade();
    });

    it("should move toward the player's tank", function() {
      expect(invader.box.y).toBe(y + 10);
    });

    it("should invert its lateral velocity", function() {
      expect(invader.velocity).toBe(velocity * -1);
    });
  });

});
