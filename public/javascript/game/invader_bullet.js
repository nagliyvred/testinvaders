function InvaderBullet() {
  var _this = new Bullet();

  _this.draw = function(painter) {
    painter.draw_invader_bullet(_this.position);
  };

  _this.collide = function(other_thing) {
    if(Object.getPrototypeOf(other_thing) === Tank.prototype) {
      _this.box.make_unhittable();
    }
  };

  return _this;

}
