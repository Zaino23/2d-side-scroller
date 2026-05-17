export function drawStatus(context, input, player) {
  context.font = '25px helvatica';
  context.fillStyle = 'white';
  context.fillText('Current input: ' + input.keys, 30, 50)
  context.fillText('Active State: ' + player.currentState.state, 30, 100)
  context.fillText('COMBOS: ← + ↑ | → + ↑ | ↑(spacebar) + ↓', 30, 150)
}