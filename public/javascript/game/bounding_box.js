function BoundingBox(x, y, width, height) {
  this.x = x ;
  this.y = y ;
  this.width = width ;
  this.height = height ;

  this.reset = function(x, y, width, height) {
    this.x = x ;
    this.y = y ;
    this.width = width ;
    this.height = height ;
  } ;

  this.make_unhittable = function() {
    this.reset(0,0,0,0) ;
  }

  this.hittable = function() {
    return (this.width > 0 || this.height > 0) ;
  } ;

  this.left = function() { return this.x ; } ;
  this.right = function() { return this.x + this.width ; } ;
  this.top = function() { return this.y ; } ;
  this.bottom = function() {return this.y + this.height ; } ;

  return this ;
} ;
