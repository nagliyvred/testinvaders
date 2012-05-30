//This bounding box is based on top-left being 0,0 and x and y increase as you
//go towards the bottom right
describe("BoundingBox", function() {
  var box;

  beforeEach(function() {
    box = new BoundingBox(10, 20, 30, 40);
  });

  describe("left", function() {
    it("should return x", function() {
      expect(box.left()).toBe(10);
    });
  });

  describe("right", function() {
    it("should return the width offset by x", function() {
      expect(box.right()).toBe(40);
    });
  });

  describe("top", function() {
    it("should return y", function() {
      expect(box.top()).toBe(20);
    });
  });

  describe("bottom", function() {
    it("should return the height offset by y", function() {
      expect(box.bottom()).toBe(60);
    });
  });

  describe("collision detection", function() {
    var box_overlapping;
    var box_not_overlapping;

    beforeEach(function() {
      box_overlapping = new BoundingBox(10, 20, 30, 40);
      box_not_overlapping = new BoundingBox(1, 2, 3, 4);
    });

    it("should not detect a collision with itself", function() {
      expect(box.is_colliding_with(box)).toBeFalsy();
    });

    it("should detect a collision with an overlapping box", function() {
      expect(box.is_colliding_with(box_overlapping)).toBeTruthy();
    });

    it("should not detect a collision with boxes that is not overlapping", function() {
      expect(box.is_colliding_with(box_not_overlapping)).toBeFalsy();
    });
  });
});
