function Collision() {
  this.have_collided = function(bb1, bb2) {
    if (bb1.bottom() < bb2.top()) { return false };
    if (bb1.top() > bb2.bottom()) { return false };
    if (bb1.right() < bb2.left()) { return false };
    if (bb1.left() > bb2.right()) { return false };

    return true ;
  };

  return this;
}
