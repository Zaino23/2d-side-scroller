export default class Collision {

  static check(player, enemy) {
    let pad = 30;
    if (
      player.x + player.width - pad> enemy.x + pad &&
      player.x  + pad < enemy.x + enemy.sizeWidth - pad &&
      player.y +player.height> enemy.y + pad &&
      player.y + pad < enemy.y + enemy.sizeHeight - pad 
    ) {
      return true; 
    } 
    return false;
  }
}
export class Explosion {
  constructor(x, y) {
    this.image = document.querySelector('#boom');
    this.x = x;
    this.y = y;
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.size = 100;
    this.frameX = 0;
    this.maxFrameX = 4;
    this.fps = 15;
    this.frameInterval = 1000/this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }
  update(deltaTime, gameSpeed) {
     if(this.frameTimer > this.frameInterval) {
      if(this.frameX < this.maxFrameX) {this.frameX ++; this.frameTimer = 0}
      else this.markedForDeletion = true;
    } else this.frameTimer += deltaTime;

    if(gameSpeed > 0) this.x -= gameSpeed;

  }
  draw(context) {
    context.drawImage(
                      this.image,
                      this.frameX * this.spriteWidth,
                      0,
                      this.spriteWidth,
                      this.spriteHeight,
                      this.x,
                      this.y,
                      this.size,
                      this.size
    )
  }
}
