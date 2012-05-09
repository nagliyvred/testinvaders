describe("Bullet", function() {

  describe("when it is shot", function() {
    it("should move vertically at some velocity", function() {
      var velocity = Math.random();
      var dt = Math.random();
      var bullet = new Bullet(velocity);
      bullet.x = 0;
      bullet.update(dt);
      expect(bullet.x).toEqual(dt * velocity);
    });

    it("should appear like a white streak");
    it("should be hittable");

    describe("when it is hit", function() {
      it("should disappear");
      it("should not be hittable");
    });
  });

});
