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

  this.hittable = function() {
    return (this.width > 0 || this.height > 0) ;
  } ;

  this.left = function() { return this.position.x ; } ;
  this.right = function() { return this.position.x + this.width ; } ;
  this.top = function() { return this.position.y ; } ;
  this.bottom = function() {return this.position.y + this.height ; } ;

  return this ;
} ;
