export default class Layer {
  constructor(image, speedModifier, canvas) {
    this.image = image;
    this.speedModifier = speedModifier;
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
  }
  update(gameSpeed) {
    //if(gameSpeed > 0)
    if(gameSpeed > 0)this.x -= gameSpeed * this.speedModifier;
    if(this.x <= -this.width) this.x = 0;
    if(this.x > 0) this.x = 0;
  }
  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}