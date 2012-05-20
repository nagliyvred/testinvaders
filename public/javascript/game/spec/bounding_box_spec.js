//This bounding box is based on top-left being 0,0 and x and y increase as you
//go towards the bottom right
describe("BoundingBox", function() {
  var bb ;

  beforeEach(function() {
    bb = new BoundingBox(10, 20, 30, 40) ;
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
});
