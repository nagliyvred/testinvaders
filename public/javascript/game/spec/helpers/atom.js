var atom = {};

atom.Game = function() {
  this.run = function() {
    this.update(0);
    this.draw();
  };

  return this;
};
