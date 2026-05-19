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
    
    //text
    context.fillStyle = 'white';
    context.font = '40px helvatica';
    context.fillText('ENERGY:', x / 5, y +20);

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
    //text
    context.fillStyle = 'white';
    context.font = '50px halvatica';
    context.fillText('HEALTH: ' + Math.floor(this.health), x / 5, y +40);

    //background
    context.fillstyle = 'rgba(0,0,0,0.5)';
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
}