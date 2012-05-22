function BoundingBox(position, width, height) {
  this.position = position ;
  this.width = width ;
  this.height = height ;

  this.set = function(position, width, height) {
    this.position = position ;
    this.width = width ;
    this.height = height ;
  } ;

  this.make_unhittable = function() {
    this.position.x = 0 ;
    this.position.y = 0 ;
    this.width = 0 ;
    this.height = 0 ;
  }

  this.is_hittable = function() {
    return (this.width > 0 || this.height > 0) ;
  } ;

  this.is_colliding_with = function(other_box) {
    if (this === other_box) { return false; }
    if (this.bottom() < other_box.top()) { return false };
    if (this.top() > other_box.bottom()) { return false };
    if (this.right() < other_box.left()) { return false };
    if (this.left() > other_box.right()) { return false };

    return true;
  };

  this.left = function() { return this.position.x ; } ;
  this.right = function() { return this.position.x + this.width ; } ;
  this.top = function() { return this.position.y ; } ;
  this.bottom = function() {return this.position.y + this.height ; } ;

  return this ;
} ;
