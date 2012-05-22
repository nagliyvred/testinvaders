function InvaderBullet(velocity, x, y) {
  var _this = new Bullet(velocity, x, y);

  _this.draw = function(painter) {
    painter.draw_invader_bullet(_this.position);
  };

  _this.collide = function(other_thing) {
    if(other_thing.__proto__ === Tank.prototype) {
      _this.box.make_unhittable();
    }
  };

  return _this;

};
