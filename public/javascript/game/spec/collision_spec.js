describe("Collision", function() {
  var collision;
  var width;
  var height;
  var p ;

  beforeEach(function() {
    collision = new Collision() ;
    width = 50 ;
    height = 50 ;
    p = new Position(50, 50) ;
  }) ;

  describe("have_collided", function() {
    it("should return false if either box is not hittable", function() {
      a = new BoundingBox(p, width, height) ;
      b = new BoundingBox(new Position(50, 50), width, height) ;

      expect(collision.have_collided(a,b)).toBe(true);

      a.make_unhittable() ;

      expect(collision.have_collided(a,b)).toBe(false);

      a = new BoundingBox(new Position(50, 50), width, height) ;
      b.make_unhittable() ;
      
      expect(collision.have_collided(a,b)).toBe(false);
    }) ;

    it("should return false as a is far outside the top left of b", function() {
      a = new BoundingBox(p, width, height) ;
      b = new BoundingBox(new Position(150, 150), width, height) ;

      expect(collision.have_collided(a, b)).toBe(false);
    });

    it("should return false as a horizontally inline with b but not overlapping", function() {
      a = new BoundingBox(p, width, height) ;
      b = new BoundingBox(new Position(50, 150), width, height) ;

      expect(collision.have_collided(a, b)).toBe(false);
    });

    it("should return false as a vertically inline with b but not overlapping", function() {
      a = new BoundingBox(p, width, height) ;
      b = new BoundingBox(new Position(150, 50), width, height) ;

      expect(collision.have_collided(a, b)).toBe(false);
    });

    it("should return true as a is overlapping the top-left of b", function() {
      a = new BoundingBox(p, width, height) ;
      b = new BoundingBox(new Position(75, 75), width, height);

      expect(collision.have_collided(a,b)).toBe(true);
    });

    it("should return true as a is overlapping the top-right of b", function() {
      a = new BoundingBox(p, width, height) ;
      b = new BoundingBox(new Position(75, 25), width, height);

      expect(collision.have_collided(a,b)).toBe(true);
    });

    it("should return true as a is inside of b", function() {
      a = new BoundingBox(new Position(60, 60), 30, 30) ;
      b = new BoundingBox(p, width, height);

      expect(collision.have_collided(a,b)).toBe(true);
    });

    it("should return true as a and b form a cross", function() {
      a = new BoundingBox(new Position(50, 60), width, 20) ;
      b = new BoundingBox(new Position(60, 50), 20, height);

      expect(collision.have_collided(a,b)).toBe(true);
    });
  });
});
