function BoundingBox(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.set = function(x, y, width, height) {
    this.x = x;
    this.y = y
    this.width = width;
    this.height = height;
  };

  this.make_unhittable = function() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
  };

  this.is_colliding_with = function(other_box) {
    if (this === other_box) { return false; }
    if (this.bottom() < other_box.top()) { return false; }
    if (this.top() > other_box.bottom()) { return false; }
    if (this.right() < other_box.left()) { return false; }
    if (this.left() > other_box.right()) { return false; }

    return true;
  };

  this.left = function() { return this.x; };
  this.right = function() { return this.x + this.width; };
  this.top = function() { return this.y; };
  this.bottom = function() {return this.y + this.height; };

  return this;
}
