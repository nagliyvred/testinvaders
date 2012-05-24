describe("A space invaders bullet", function() {
  var bullet;
  var velocity;
  var x;
  var y;
  var owner;

  beforeEach(function() {
    velocity = Math.random();
    x = Math.random();
    y = Math.random();
    owner = { };
    
    bullet = new InvaderBullet();
    bullet.shoot(velocity, x, y, owner);
  });

  describe("appearance", function() {
    var stub_painter;

    beforeEach(function() {
      stub_painter = {draw_invader_bullet: jasmine.createSpy("draw_invader_bullet") };
    });

    it("should look like a zig-zag line", function() {
      bullet.draw(stub_painter);
      expect(stub_painter.draw_invader_bullet).toHaveBeenCalled();
    });

  });

  describe("collisions", function() {

    beforeEach(function() {
      bullet.shoot(0, 0, 0);
    });

    it("should not collide with invaders", function() {
      bullet.collide(new Invader());
      expect(bullet.box.is_hittable()).toBeTruthy();
    });

    it("should collide with the tank", function() {
      bullet.collide(new Tank());
      expect(bullet.box.is_hittable()).toBeFalsy();
    });

  });

});
