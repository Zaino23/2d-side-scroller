export class Status {
  constructor(max = 100, maxHealth = 100) {
    this.max = max;
    this.value = max;
    this.regenRate = 0.05;
    this.drainRoll = 40;
    this.drainDive = 30;
    this.drainAirRoll = 30;
    this.isFlashing = false;
    this.visible = true;
    this.flashTimer = 0;
    this.flapCounter = 0;
    this.maxHealth = maxHealth;
    this.health = 100;
  }
  drain(amount) {
    this.value = Math.max(0, this.value - amount)
  }
  regen(amount) {
    this.value = Math.min(this.max, this.value + amount)
  }
  hasEnough(amount) {
    return this.value >= amount;
  }
  triggerFlash() {
    this.isFlashing = true;
    this.visible = false;
    this.flashTimer = 0;
    this.flapCounter = 0;
  }
  draw(context, x, y, width, height, deltaTime) {
      if(this.isFlashing) {
      this.flashTimer += deltaTime;
      if(this.flashTimer >= 300) {this.flashTimer = 0; this.flapCounter ++; this.visible = !this.visible}
      if(this.flapCounter >= 6) {this.flashTimer = 0; this.flapCounter = 0; this.visible = true; this.isFlashing = false;} 
    } 

    if(!this.visible) return;

    const ratio  = this.value / this.max;
    context.save();
    context.shadowBlur = this.isFlashing ? 50 : 0; 
    context.shadowColor = ratio > 0.6 ? '#00e5ff' : ratio > 0.4 ? 'orange' : 'red';
    //background  
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(x,y,width,height);

    //color change
    context.fillStyle = ratio > 0.6 ? '#00e5ff' : ratio > 0.4 ? 'orange' : 'red';
    context.fillRect(x, y, width * ratio, height)

    //border
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.strokeRect(x, y, width, height)
    context.restore();
  }
  damage(amount) {
    this.health = Math.max(0, this.health - amount);
  }
  heal(amount) {  
    this.health = Math.min(this.maxHealth, this.health + amount);
  }
  drawHealth(context, x, y, width, height) {

    //background
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(x, y, width, height)

    //color
    const ratio = this.health / this.maxHealth;
    context.fillStyle = ratio > 0.6 ? 'lightgreen' : ratio > 0.3  ? 'orange' : 'red';
    context.fillRect(x, y, width * ratio, height);

    //border
    context.strokeStyle = 'white';
    context.lineWidth = 2;
    context.strokeRect(x, y, width, height)
  }
  drawTime(ctx, canvas, timeLeft, initialTime) {
    const ratio = timeLeft / initialTime;
    ctx.fillStyle = ratio > 0.6 ? 'darkgreen' : ratio > 0.5 ? 'orange' : 'red';
    ctx.font = '40px "Jersey 10"';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1
    ctx.fillText(`${timeLeft.toFixed(2)}s`, canvas.width / 2 - 30, 50);
    ctx.strokeText(`${timeLeft.toFixed(2)}s`, canvas.width / 2 - 30, 50);
  }
  drawGoal(ctx, kills, killsGoal, x, y, width, height) {
    //background
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x, y, width, height)

    //bar
    const ratio = kills / killsGoal;
    ctx.fillStyle = ratio > 0.6 ? 'darkgreen' : ratio > 0.5 ? 'orange' : 'red';
    ctx.fillRect(x, y, width * ratio, height)

    //border
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    //text
    ctx.fillStyle = ratio > 0.6 ? 'darkgreen' : ratio > 0.5 ? 'orange' : 'red';
    ctx.font = '55px "Jersey 10"';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.fillText('Kills Goal:',  x - 175, y + y / 2.5 , 750)
  } 
}