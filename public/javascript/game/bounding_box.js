function BoundingBox(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  // Left, right, top bottom make the collision comparisons more readable
  this.left = function() { return this.x; };
  this.right = function() { return this.x + this.width; };
  this.top = function() { return this.y; };
  this.bottom = function() {return this.y + this.height; };

  this.is_colliding_with = function(other_box) {
    if (this === other_box) { return false; }
    if (this.bottom() < other_box.top()) { return false; }
    if (this.top() > other_box.bottom()) { return false; }
    if (this.right() < other_box.left()) { return false; }
    if (this.left() > other_box.right()) { return false; }

    return true;
  };

  return this;
}
