describe("Bullet", function() {
  var bullet;

  beforeEach(function() {
    bullet = new Bullet();
  });

  function shared_initial_state_examples() {
    it("should not be visible", function() {
      var stub_painter = {};
      bullet.draw(stub_painter);
    });

    it("should not be hittable", function() {
      var box = bullet.box;

      expect(box.width).toBe(0);
      expect(box.height).toBe(0);
    });
  }

  shared_initial_state_examples();

  describe("when first create", function() {
    it("should belong to team us", function() {
      expect(bullet.team).toBe("us");
    });
  }) ;

  describe("when it is shot", function() {
    var velocity;
    var x;
    var y;

    beforeEach(function() {
      velocity = Math.random();
      x = Math.random();
      y = Math.random();
      p = new Position(x, y) ;

      bullet.shoot(velocity, x, y);
    });

    it("should move vertically at some velocity", function() {
      delta_time = Math.random();

      bullet.update(delta_time);

      expect(bullet.position.y).toEqual(y + (delta_time * velocity));
    });

    it("should appear like a white streak", function() {
      var spy_draw_bullet = jasmine.createSpy('draw_bullet');
      var stub_painter = {draw_bullet: spy_draw_bullet};

      bullet.draw(stub_painter);
      expect(spy_draw_bullet).toHaveBeenCalledWith(p);
    });

    it("should be hittable", function() {
      var box = bullet.box;

      expect(box.position.x).toBe(x);
      expect(box.position.y).toBe(y);
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    });

    describe("when it is hit", function() {
      beforeEach(function() {
        bullet.collide();
      });

      shared_initial_state_examples();
    });
  });

  describe("joinTeamThem", function() {
    it("should change the bullet team to them", function() {
      bullet.joinTeamThem() ;
      expect(bullet.team).toBe("them") ;
    });
  });
});
