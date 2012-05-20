describe("Collision", function() {
  var collision;
  var width;
  var height;

  beforeEach(function() {
    collision = new Collision() ;
    width = 50 ;
    height = 50 ;
  }) ;

  it("should return false as a is far outside the top left of b", function() {
    a = new BoundingBox(50, 50, width, height) ;
    b = new BoundingBox(150, 150, width, height) ;

    expect(collision.have_collided(a, b)).toBe(false);
  });

  it("should return false as a horizontally inline with b but not overlapping", function() {
    a = new BoundingBox(50, 50, width, height) ;
    b = new BoundingBox(50, 150, width, height) ;

    expect(collision.have_collided(a, b)).toBe(false);
  });

  it("should return false as a vertically inline with b but not overlapping", function() {
    a = new BoundingBox(50, 50, width, height) ;
    b = new BoundingBox(150, 50, width, height) ;

    expect(collision.have_collided(a, b)).toBe(false);
  });
  
  it("should return true as a is overlapping the top-left of b", function() {
    a = new BoundingBox(50, 50, width, height) ;
    b = new BoundingBox(75, 75, width, height);
    
    expect(collision.have_collided(a,b)).toBe(true);
  });

  it("should return true as a is overlapping the top-right of b", function() {
    a = new BoundingBox(50, 50, width, height) ;
    b = new BoundingBox(75, 25, width, height);
    
    expect(collision.have_collided(a,b)).toBe(true);
  });

  it("should return true as a is inside of b", function() {
    a = new BoundingBox(60, 60, 30, 30) ;
    b = new BoundingBox(50, 50, width, height);
    
    expect(collision.have_collided(a,b)).toBe(true);
  });

  it("should return true as a and b form a cross", function() {
    a = new BoundingBox(50, 60, width, 20) ;
    b = new BoundingBox(60, 50, 20, height);
    
    expect(collision.have_collided(a,b)).toBe(true);
  });
});
