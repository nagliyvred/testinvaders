describe("Invader", function() {
  var invader;
  var x, y, shot_countdown;
  var stub_bulllet;
  var stub_painter;

  var minimum_countdown = 10;
  var velocity = 50;
  var width = 66, height = 48;

  beforeEach(function() {
    x = Math.random();
    y = Math.random();
    shot_countdown = 20 ;

    stub_bullet = {shoot: jasmine.createSpy("stub_bullet.shoot")};
    stub_painter = {draw_invader: jasmine.createSpy("stub_painter.draw_invader")};

    invader = new Invader(x, y, stub_bullet);
  });

  it("should be hittable", function() {
    var box = invader.box;

    expect(box.x).toEqual(x);
    expect(box.y).toEqual(y);
    expect(box.height).toBeGreaterThan(0);
    expect(box.width).toBeGreaterThan(0);
  });

  it("it should be active", function() {
    expect(invader.active).toBeTruthy();
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

      var time_elapsed_until_the_next_shot;
      var minimum_time_between_shots = 20;

      var elapse_shot_timer = function() {
        invader.update(time_elapsed_until_the_next_shot);
        time_elapsed_until_the_next_shot = minimum_time_between_shots;
      };

      beforeEach(function() {
        time_elapsed_until_the_next_shot = shot_countdown;
      });

      describe("shooting when the timer has elapsed", function() {

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

  describe("collisions", function() {
    it("should not collide with invader bullets", function() {
      var invader_bullet = new InvaderBullet();
      var shooting_invader = new Invader();
      invader_bullet.shoot(0, 0, 0, shooting_invader);

      invader.collide(invader_bullet);

      expect(invader.active).toBeTruthy();
    });

    it("should collide with the tank bullets", function() {
      var tank_bullet = new Bullet();
      var tank = new Tank();
      tank_bullet.shoot(0, 0, 0, tank);

      invader.collide(tank_bullet);

      expect(invader.active).toBeFalsy();
    });
  });

  describe("after a collision", function() {

    beforeEach(function() {
      var bullet = new Bullet();
      bullet.shoot(0, 0, 0, new Tank());
      invader.collide(bullet);
    });

    it("it should not be active", function() {
      expect(invader.active).toBeFalsy();
    });
  });
});
