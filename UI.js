export const SCREEN = {
  START: 'start',
  PLAYING: 'playing',
  PAUSE: 'paused',
  END: 'end'
} 

export class UI {
  constructor() {
    this.currentScreen = SCREEN.START; 
    this.buttons = document.querySelectorAll('.btn')
    this.selectedIndex = 0;
    this.updateSelection();
  }
  setScreen(screen) {
    this.currentScreen = screen
  }
  is(screen) {
    return this.currentScreen === screen;
  }
  drawStart(ctx, canvas) {
    ctx.save()
    ctx.fillStyle = 'rgba(0,0,0,0.8)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.restore();

  }
  drawPause(ctx, canvas) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '80px sans';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('PAUSED', canvas.width/2, canvas.height/2 - 40);

    //menu

    ctx.restore();
  }
  drawEnd(ctx, canvas) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '80px sans';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'white';
    ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2 - 40);

    //menu

    ctx.restore();
  }

  updateSelection() {
    this.buttons.forEach((btn, index) => {
      btn.classList.toggle('selected', index === this.selectedIndex)
    });
  }
  handleMenuInput(key) {
    const pressedKey = key.toUpperCase();
    if(pressedKey === 'ARROWDOWN' || pressedKey === 'S') {
      this.selectedIndex = (this.selectedIndex + 1) % this.buttons.length;
      this.updateSelection();
    }

    if(pressedKey === 'ARROWUP' || pressedKey === 'W') {
      this.selectedIndex = (this.selectedIndex - 1 + this.buttons.length) % this.buttons.length;
      this.updateSelection();
    }
  }
}
