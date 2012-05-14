describe("Swarm", function() {
  var stub_invader = {id: "stub_invader"};
  var invaders = [stub_invader];
  var swarm;

  beforeEach(function() {
    swarm = new Swarm(invaders);
  });

  describe("when one of the invaders hits the edge of the screen", function() {
    xit("should tell all the invaders to INVADE")
  });
});
