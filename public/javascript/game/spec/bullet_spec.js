describe("Bullet", function() {
  describe("when it is shot", function() {
    it("should move vertically at some velocity", function() {
      var velocity = Math.random();
      var dt = Math.random();
      var y = Math.random();
      var bullet = new Bullet(velocity, 0, y);

      bullet.update(dt);

      expect(bullet.y).toEqual(y + (dt * velocity));
    });

    it("should appear like a white streak");
    it("should be hittable", function() {
      var x = Math.random(), y = Math.random();
      var bullet = new Bullet(0, x, y);

      var box = bullet.box();

      expect(box.x).toBe(x);
      expect(box.y).toBe(y);
      expect(box.width).toBe(4);
      expect(box.height).toBe(12);
    });

    describe("when it is hit", function() {
      it("should disappear");
      it("should not be hittable");
    });
  });
});
