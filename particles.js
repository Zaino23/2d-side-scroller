export class FireParticles {
  constructor(x, y, audio) {
    this.x = x;
    this.y =y;
    this.size = Math.random() * 40 + 20;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -3 - 1; 
    this.alpha = 1;
    this.colors = ['yellow', 'orange', 'red']
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)]
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= 0.02;
    this.size -= 0.5;
  }
  draw(context) {
    context.save();
    context.globalAlpha = this.alpha;
    context.shadowBlur = 30;
    context.shadowColor = this.color;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fill();
    context.restore();
  }
}
