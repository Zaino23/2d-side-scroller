class Enemy{
  constructor(gameWidth, gameHeight) {
    this.image;
    this.x;
    this.y;
    this.width;
    this.height;
    this.sizeWidth;
    this.sizeHeight;
    this.gameWidth = gameWidth; 
    this.gameHeight = gameHeight;
    this.speedX = 3;
    this.frameX = 0;
    this.maxFrameX= 11;
    this.fps = 30;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(gameSpeed) {
    if(gameSpeed > 0)this.x -= this.speedX + gameSpeed; 
    else this.x -= this.speedX
    if(this.x <= 0 - this.sizeWidth) this.markedForDeletion = true;
  }
  draw(context, deltaTime) {
    if(this.frameTimer > this.frameInterval) {
      if(this.frameX < this.maxFrameX) this.frameX ++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    context.drawImage(
                      this.image,
                      this.width * this.frameX,
                      0,
                      this.width, 
                      this.height,
                      this.x,
                      this.y,
                      this.sizeWidth,
                      this.sizeHeight,
                     )
  }
}
export class GroundEnemy extends Enemy{
  constructor(gameWidth, gameHeight, groundMargin) {
    super(gameWidth, gameHeight)
    this.groundMargin = groundMargin
    this.image = document.getElementById('enemy1');
    this.width = 451;
    this.height = 508;
    this.sizeWidth = 100;
    this.sizeHeight = 113;
    this.x = gameWidth + Math.random() *  500;
    this.y = this.gameHeight - this.sizeHeight - this.gameHeight * (this.groundMargin *0.95);
    this.speedX = Math.random() * 1 + 1;
    this.maxFrameX = 25;
  }
}
export class FlyingEnemies extends Enemy{
  constructor(gameWidth, gameHeight) {
    super(gameWidth, gameHeight);
    this.image = document.getElementById('enemy2');
    this.width = 396;
    this.height = 582;
    this.sizeWidth = 99;
    this.sizeHeight = 145.5;
    this.x = gameWidth + Math.random() * 125;
    this.y = Math.max(0, gameHeight / 3 - Math.random() * 200);
    this.speedX = Math.random() + 1;
    this.baseY = gameHeight * 0.15 + Math.random() * gameHeight * 0.25;
    this.y = this.baseY;
    this.maxFrameX = 10;
    this.angle = Math.random() * Math.PI * 2;
    this.va = Math.random() * 0.002 + 0.002;
    this.waveAmplitude = 10 + Math.random() * 10;
  }
  update(gameSpeed, deltaTime) {
    super.update(gameSpeed);
    this.angle += this.va * deltaTime;
    this.y = this.baseY + Math.sin(this.angle) * this.waveAmplitude;
  }
}