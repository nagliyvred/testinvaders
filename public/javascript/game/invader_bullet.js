function InvaderBullet(velocity, x, y) {

  var _this = new Bullet(velocity, x, y);

  _this.draw = function(painter) {
    painter.draw_invader_bullet(_this.position);
  };

  return _this;

};
