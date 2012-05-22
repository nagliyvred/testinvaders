function InvaderBullet(velocity, x, y) {
  var _this = new Bullet(velocity, x, y);

  _this.draw = function(painter) {
    painter.draw_invader_bullet(_this);
  };

  _this.collide = function(other_thing) {
    if(Object.getPrototypeOf(other_thing) === Tank.prototype) {
      _this.box.make_unhittable();
    }
  };

  return _this;

}
