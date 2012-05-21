//This bounding box is based on top-left being 0,0 and x and y increase as you
//go towards the bottom right
describe("BoundingBox", function() {
  var bb ;
  var position ;

  beforeEach(function() {
    position = new Position(10, 20);
    bb = new BoundingBox(position, 30, 40) ;
  });

  describe("left", function() {
    it("should return x", function() {
      expect(bb.left()).toBe(10);
    });
  });

  describe("right", function() {
    it("should return the width offset by x", function() {
      expect(bb.right()).toBe(40);
    });
  });

  describe("top", function() {
    it("should return y", function() {
      expect(bb.top()).toBe(20);
    });
  });

  describe("bottom", function() {
    it("should return the height offset by y", function() {
      expect(bb.bottom()).toBe(60);
    });
  });

  describe("set", function() {
    it("should set the x,y,width and height to new values", function() {
      position.x = 1;
      position.y = 2 ;
      bb.set(position,3,4);

      expect(bb.position.x).toBe(1);
      expect(bb.position.y).toBe(2);
      expect(bb.width).toBe(3);
      expect(bb.height).toBe(4);
    });
  });

  describe("make_unhittable", function() {
    it("should set the x,y,width and height to zero", function() {
      bb.make_unhittable() ;

      expect(bb.position.x).toBe(0);
      expect(bb.position.y).toBe(0);
      expect(bb.width).toBe(0);
      expect(bb.height).toBe(0);
    }) ;
  }) ;

  describe("hittable", function() {
    it("should return false if width and height are zero", function() {
      bb.make_unhittable() ;

      expect(bb.hittable()).toBe(false) ;
    });

    it("should return true otherwise", function() {
      expect(bb.hittable()).toBe(true) ;
    });
  });
});
