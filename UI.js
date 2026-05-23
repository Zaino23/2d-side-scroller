import { playSFX } from "./audio.js";

export const SCREEN = {
  START: 'start',
  SELECTING: 'selecting', 
  READY: 'ready',
  PLAYING: 'playing',
  PAUSE: 'paused',
  WIN: 'win',
  LOSE: 'lose',
} 

export class UI {
  constructor() {
    this.currentScreen = SCREEN.START; 
    this.buttons = document.querySelectorAll('.Sbtn');
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

  updateSelection(screen) {
    this.buttons = screen === SCREEN.START ? document.querySelectorAll('.Sbtn') : screen === SCREEN.PAUSE ? document.querySelectorAll('.Pbtn') : document.querySelectorAll('.btn');

    this.buttons.forEach((btn, index) => {
      btn.classList.toggle('selected', index === this.selectedIndex)
    });
  }
  handleMenuInput(key, screen) {
    this.buttons = screen === SCREEN.START ? document.querySelectorAll('.Sbtn') : screen === SCREEN.PAUSE ? document.querySelectorAll('.Pbtn') : null; 
    const pressedKey = key.toUpperCase();
    if(pressedKey === 'ARROWDOWN' || pressedKey === 'S') {
      this.selectedIndex = (this.selectedIndex + 1) % 3;
      this.updateSelection(screen);
      playSFX('Select')
    }

    if(pressedKey === 'ARROWUP' || pressedKey === 'W') {
      this.selectedIndex = (this.selectedIndex - 1 + 3) % 3;
      this.updateSelection(screen);
      playSFX('Select')
    }
  }
  drawReady(ctx, deltaTime) {
    let countDownTimer  = 4;
    if(countDownTimer     )
    countDownTimer -= deltaTime / 1000
    
    ctx.fillStyle = 'white';
    ctx.font = '50px "Jersey 10"';
    ctx.textAlign = 'center';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.fillText(Math.floor(countDownTimer), canvas.width / 2, canvas.height / 2, 150);
    ctx.StrokeText(Math.floor(countDownTimer), canvas.width / 2, canvas.height / 2, 150);
  }
}
