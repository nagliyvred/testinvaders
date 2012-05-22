function BoundingBox(thing, width, height) {
  this.width = width;
  this.height = height;

  this.set = function(width, height) {
    this.width = width;
    this.height = height;
  };

  this.make_unhittable = function() {
    thing.x = 0;
    thing.y = 0;
    this.width = 0;
    this.height = 0;
  };

  this.is_hittable = function() {
    return (this.width > 0 || this.height > 0);
  };

  this.is_colliding_with = function(other_box) {
    if (this === other_box) { return false; }
    if (this.bottom() < other_box.top()) { return false; }
    if (this.top() > other_box.bottom()) { return false; }
    if (this.right() < other_box.left()) { return false; }
    if (this.left() > other_box.right()) { return false; }

    return true;
  };

  this.left = function() { return thing.x; };
  this.right = function() { return thing.x + this.width; };
  this.top = function() { return thing.y; };
  this.bottom = function() {return thing.y + this.height; };

  return this;
}
