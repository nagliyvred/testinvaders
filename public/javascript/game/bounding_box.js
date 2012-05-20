function BoundingBox(x, y, width, height) {
  this.left = function() { return x ; } ;
  this.right = function() { return x + width ; } ;
  this.top = function() { return y ; } ;
  this.bottom = function() {return y + height ; } ;
} ;
