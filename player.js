import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight, DivingLeft, DivingRight, RollingLeft, RollingRight } from "./state.js";


export default class Player {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this), new DivingLeft(this), new DivingRight(this), new RollingLeft(this), new RollingRight(this)];
    this.currentState = this.states[1];
    this.currentState.enter()
    this.image = document.getElementById('sprite')
    this.width = 200;
    this.height = 181.83;
    this.x = 100;
    this.y = gameHeight - this.height * 1.6;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrameX = 6;
    this.vy = 0;
    this.diveLanded = false;
    this.weight = 0.5;
    this.speed = 0;
    this.maxSpeed = 5;
    this.fps = 25;
    this.frameTimer = 0;
    this.frameInterval = 1000/this.fps
  }
  draw(context, deltaTime ) {
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
                      this.height * this.frameY,
                      this.width,
                      this.height,
                      this.x,
                      this.y,
                      this.width,
                      this.height
                    )
  }
  update(input, deltaTime) {
    this.currentState.handleInput(input, deltaTime);
    //horizontal manegement
    this.x += this.speed;
    if(this.x <= 0) this.x = 0;
    else if(this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;
    //vertica; manegement
    this.y += this.vy;
    if(!this.onGround()) {
      this.vy += this.weight;
    }
    else {
      this.vy = 0
    }
    if(this.y > this.gameHeight - this.height * 1.6) this.y = this.gameHeight - this.height * 1.6;
  }
  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  onGround() {
    return this.y >= this.gameHeight - this.height * 1.6; 
  }
}