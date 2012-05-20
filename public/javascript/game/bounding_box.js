function BoundingBox(bx, by, bwidth, bheight) {
  var x = bx ;
  var y = by ;
  var width = bwidth ;
  var height = bheight ;

  this.width = function() { return width;} ;
  this.height = function() { return height; } ;

  this.left = function() { return x ; } ;
  this.right = function() { return x + width ; } ;
  this.top = function() { return y ; } ;
  this.bottom = function() {return y + height ; } ;

  return this ;
} ;
