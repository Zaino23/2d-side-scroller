import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningLeft, RunningRight, JumpingLeft, JumpingRight, FallingLeft, FallingRight, DivingLeft, DivingRight, RollingLeft, RollingRight, AirRollingLeft, AirRollingRight } from "./state.js";
import { Status } from "./status.js";

export default class Player {
  constructor(gameWidth, gameHeight, groundMargin) {
    this.groundMargin = groundMargin;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this), new DivingLeft(this), new DivingRight(this), new RollingLeft(this), new RollingRight(this), new AirRollingLeft(this), new AirRollingRight(this)];
    this.currentState = this.states[1];
    this.currentState.enter();
    this.image = document.getElementById('sprite');
    this.width = 200;
    this.height = 181.83;
    this.x = 100;
    this.y = this.gameHeight - this.height - this.gameHeight * this.groundMargin;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrameX = 6;
    this.vy = 0;
    this.diveLanded = false;
    
    // --- UPDATED FOR 60 FPS ---
    this.weight = 1.25;          // Increased from 0.5 to match 144Hz jump height
    this.maxSpeed = 7;         // Increased from 3 to match 144Hz horizontal speed
    // ---------------------------
    
    this.energy = new Status(100, 100);
    this.speed = 0;
    this.fps = 30;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }

  draw(context) { 
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
    );
  }

  update(input, deltaTime) {
    this.currentState.handleInput(input, deltaTime);
    
    // Horizontal management
    this.x += this.speed;
    if (this.x >= this.gameWidth - this.width * 2) this.x = this.gameWidth - this.width * 2;
    if (this.x <= 0) this.x = 0;
    
    // Vertical management
    this.y += this.vy;
    if (this.y < 0) {
      this.y = 0;
    }

    if (!this.onGround() && this.y === 0 + this.height) this.y = 0;
    
    if (!this.onGround()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }
    
    if (this.y > this.gameHeight - this.height - this.gameHeight * this.groundMargin) {
      this.y = this.gameHeight - this.height - this.gameHeight * this.groundMargin;
    }
  }

  updateAnimation(deltaTime) {
    if (this.frameTimer > this.frameInterval) {
      if (this.frameX < this.maxFrameX) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  onGround() {
    return this.y >= this.gameHeight - this.height - this.gameHeight * this.groundMargin; 
  }
}