describe("A space invaders bullet", function() {
  var bullet;

  beforeEach(function() {
    bullet = new InvaderBullet();
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

  describe("team membership", function() {

    it("should be a member of the terrifying invaders team (them)", function() {
      expect(bullet.team).toEqual("them");
    });

  });

});
