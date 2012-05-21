describe("Invader", function() {
  var invader;
  var velocity, x, y, shot_countdown;
  var stub_bulllet;
  var stub_painter;

  var minimum_countdown = 10;
  var width = 66, height = 48;

  beforeEach(function() {
    velocity = Math.random();
    x = Math.random();
    y = Math.random();
    p = new Position(x, y) ;
    shot_countdown = Math.random();

    stub_bullet = {shoot: jasmine.createSpy("stub_bullet.shoot")};
    stub_painter = {draw_invader: jasmine.createSpy("stub_painter.draw_invader")}

    invader = new Invader(velocity, x, y, shot_countdown, stub_bullet);
  });

  it("should be hittable", function() {
    var box = invader.box;

    expect(box.position.x).toEqual(x);
    expect(box.position.y).toEqual(y);
    expect(box.height).toBeGreaterThan(0);
    expect(box.width).toBeGreaterThan(0);
  });

  it("should look like blatant copyright infringement", function() {
    invader.draw(stub_painter);
    expect(stub_painter.draw_invader).toHaveBeenCalledWith(p);
  });

  describe("when updated", function() {
    var stub_input = {};

    it("should move laterally", function() {
      invader.update(1, stub_input);

      var new_box = invader.box;

      expect(new_box.position.x).toEqual(x + velocity);
      expect(new_box.position.y).toEqual(y);
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

      describe("staggered bullets", function() {
        it("should not shoot at the same time as another invader", function() {
          var another_shot_countdown = 15;
          var another_stub_bullet = {shoot: jasmine.createSpy("another_stub_bullet.shoot")};
          var another_invader = new Invader(0, 0, 0, another_shot_countdown, another_stub_bullet);

          [invader, another_invader].forEach(function(i) {
            i.update(shot_countdown);
          });

          expect(stub_bullet.shoot).toHaveBeenCalled();
          expect(another_stub_bullet.shoot).wasNotCalled();
        });
      });
    });
  });

  describe("when told to invade", function() {
    xit("should move toward the player's tank");
    xit("should invert its lateral velocity");
  });

  describe("collisions", function() {
    it("should not collide with invader bullets", function() {
      var invader_bullet = new InvaderBullet();
      var shooting_invader = new Invader();
      invader_bullet.shoot(0, 0, 0, shooting_invader);

      invader.collide(invader_bullet);

      expect(invader.box.is_hittable()).toBeTruthy();
    });

    it("should collide with the tank bullets", function() {
      var tank_bullet = new Bullet();
      var tank = new Tank();
      tank_bullet.shoot(0, 0, 0, tank);

      invader.collide(tank_bullet);

      expect(invader.box.is_hittable()).toBeFalsy();
    });
  });

  describe("after a collision", function() {

    beforeEach(function() {
      var bullet = new Bullet();
      bullet.shoot(0, 0, 0, new Tank());
      invader.collide(bullet);
    });

    it("should be dead dead dead (ie, not visible)", function() {
      invader.draw(stub_painter);

      expect(stub_painter.draw_invader).wasNotCalled();
    });

    it("should not be hittable", function() {
      var box = invader.box;

      expect(box.width).toEqual(0);
      expect(box.height).toEqual(0);
    });
  });
});
