function InvaderBullet(velocity, x, y) {

  var _this = new Bullet(velocity, x, y);

  _this.draw = function(painter) {
    painter.draw_invader_bullet();
  };

  return _this;

};

describe("A space invaders bullet", function() {

  describe("appearance", function() {
    var bullet;
    var stub_painter;

    beforeEach(function() {
      bullet = new InvaderBullet();
      stub_painter = {draw_invader_bullet: jasmine.createSpy("draw_invader_bullet") };
    });

    it("should look like a zig-zag line", function() {
      bullet.draw(stub_painter);
      expect(stub_painter.draw_invader_bullet).toHaveBeenCalled();
    });

  });

});
