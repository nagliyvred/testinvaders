describe("Invader", function() {
  var invader;
  var velocity, x, y, shot_countdown;
  var stub_bulllet;
  var stub_painter;

  var minimum_countdown = 10;

  beforeEach(function() {
    velocity = Math.random();
    x = Math.random();
    y = Math.random();
    shot_countdown = Math.random();

    stub_bullet = {shoot: jasmine.createSpy("stub_bullet.shoot")};
    stub_painter = {draw_invader: jasmine.createSpy("stub_painter.draw_invader")}

    invader = new Invader(velocity, x, y, shot_countdown, stub_bullet);
  });

  it("should be hittable", function() {
    var box = invader.box();

    expect(box.x).toEqual(x);
    expect(box.y).toEqual(y);
    expect(box.height).toBeGreaterThan(0);
    expect(box.width).toBeGreaterThan(0);
  });

  it("should look like blatant copyright infringement", function() {
    invader.draw(stub_painter);
    expect(stub_painter.draw_invader).toHaveBeenCalledWith(x, y);
  });

  describe("when updated", function() {
    var stub_input = {};

    it("should move laterally", function() {
      invader.update(1, stub_input);

      var new_box = invader.box();

      expect(new_box.x).toEqual(x + velocity);
      expect(new_box.y).toEqual(y);
    });

    describe("shooting", function() {

      it("should not shoot a bullet within ten seconds of firing one before", function() {
        invader.update(minimum_countdown + 1);
        invader.update(5);
        expect(stub_bullet.shoot.callCount).toEqual(1);
      });

      it("should shoot a bullet when the shot countdown is first up", function() {
        invader.update(shot_countdown + (minimum_countdown + 1));
        expect(stub_bullet.shoot).toHaveBeenCalledWith(50, x, y);
      });

      it("should shoot a bullet every time the shot countdown is up", function() {
        invader.update(shot_countdown + (minimum_countdown + 1));
        invader.update(shot_countdown + (minimum_countdown + 1));

        expect(stub_bullet.shoot.callCount).toEqual(2);
      });

      describe("staggered bullets", function() {
        it("should not shoot at the same time as another invader", function() {
          var another_shot_countdown = 15;
          var another_stub_bullet = {shoot: jasmine.createSpy("another_stub_bullet.shoot")};
          var another_invader = new Invader(0, 0, 0, another_shot_countdown, another_stub_bullet);

          [invader, another_invader].forEach(function(i) {
            i.update(shot_countdown + (minimum_countdown + 1));
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

  describe("after a collision", function() {

    beforeEach(function() {
      invader.collide();
    });

    it("should be dead dead dead (ie, not visible)", function() {
      invader.draw(stub_painter);

      expect(stub_painter.draw_invader).wasNotCalled();
    });

    it("should not be hittable", function() {
      var box = invader.box();

      expect(box.width).toEqual(0);
      expect(box.height).toEqual(0);
    });
  });
});
