class Game extends atom.Game
  constructor: ->
    super
    atom.input.bind atom.key.LEFT_ARROW, 'left'
    atom.input.bind atom.key.RIGHT_ARROW, 'right'

  update: (dt) ->
    if atom.input.pressed 'left'
      console.log "player started moving left"
    else if atom.input.down 'left'
      console.log "player still moving left"

  draw: ->
    atom.context.fillStyle = 'black'
    atom.context.fillRect 0, 0, atom.width, atom.height

    atom.context.fillStyle = 'red'
    atom.context.fillRect 50, 50, atom.width - 100, atom.height - 100
    # Carry on.

game = new Game

window.onblur = -> game.stop()
window.onfocus = -> game.run()

game.run()
