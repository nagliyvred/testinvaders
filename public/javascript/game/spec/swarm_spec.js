describe("Swarm", function() {
  var stub_invader = {id: "stub_invader"};
  var invaders = [stub_invader];
  var swarm;

  beforeEach(function() {
    swarm = new Swarm(invaders);
  });

  it("should draw all its invaders", function() {
    var stub_painter = {id: "stub_painter"};
    stub_invader.draw = jasmine.createSpy("stub_invader.draw");

    swarm.draw(stub_painter);

    expect(stub_invader.draw).toHaveBeenCalledWith(stub_painter);
  });

  it("should update all its invaders", function() {
    var dt = Math.random();
    var stub_input = {id: "stub_input"};
    stub_invader.update = jasmine.createSpy("stub_invader.update");

    swarm.update(dt, stub_input);
    expect(stub_invader.update).toHaveBeenCalledWith(dt, stub_input);
  });
});
