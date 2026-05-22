export function drawStatus(context, input, player, canvas) {
  context.font = '35px  sans';
  context.strokeStyle = 'black';
  context.fillStyle = 'white';
  context.lineWidth = 1;
  context.textShadowColor = 'black';
  context.textShadowBlur  = 5;
   
  context.fillText('"Press "ESC" For Controls"', canvas.width - 400, 50);
  context.strokeText('"Press "ESC" For Controls"',canvas.width - 400, 50);
} 