import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatus } from "./utils.js";
import { FireParticles } from "./particles.js";
import Layer from "./background.js";
import { GroundEnemy, FlyingEnemies } from "./enemies.js";
import Collision from "./collision.js";
import { Explosion } from "./collision.js";
import { playSFX } from "./audio.js";
import { SCREEN } from "./UI.js";
import { UI } from "./UI.js";
import { MenuManager } from "./menus.js";

  export let minEnemySpacing = 25; 
  export let lastEnemyX = 800;
  export function updateLastEnemyX(val) {
    lastEnemyX = val;
}

window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const loading = document.getElementById("loading");
  loading.style.display = "none"; 

  let groundMargin = 0.16;
  const player = new Player(canvas.width, canvas.height, groundMargin);
  const input = new InputHandler();
  const ui = new UI();
  let particles = [];
  let explosion = [];

  let screen = SCREEN.START;
  let reward = 0;
  let timeLeft = 0;
  let initialTime = 0;
  let killsGoal = 0;
  function setToPlaying(newScreen, newInitialTime, newTimeLeft, newKillsGoal, newReward) {
    screen = newScreen;
    initialTime = newInitialTime;
    timeLeft = newTimeLeft;
    killsGoal = newKillsGoal;
    reward = newReward;
  }
  function updateScreen(newScreen) {
    screen = newScreen;
  }

  const menuManager = new MenuManager(screen, SCREEN, playSFX, ui, setToPlaying, updateScreen);

  function handleParticles() {
    if (
      player.currentState.state === "DIVING LEFT" ||
      player.currentState.state === "DIVING RIGHT"
    ) {
      particles.push(
        new FireParticles(
          player.x + player.width / 2,
          player.y + player.height * 0.2,
        ),
      );
    } else if (player.currentState.state === "ROLLING RIGHT" || player.currentState.state === 'AIRROLLING RIGHT') {
      particles.push(new FireParticles(player.x, player.y + player.height / 2));
    } else if (player.currentState.state === "ROLLING LEFT" || player.currentState.state === 'AIRROLLING LEFT') {
      particles.push(
        new FireParticles(
          player.x + player.width,
          player.y + player.height / 2
        ),
      );
    }
    if (player.diveLanded) {
      for (let i = 0; i < 3; i++) {
        particles.push(
          new FireParticles(
            player.x + player.width / 2,
            player.y + player.height * 0.2
          ),
        );
      }
      player.diveLanded = false;
    }

    particles.forEach((p) => {
      p.update();
      p.draw(ctx);
    });
    particles = particles.filter((p) => p.alpha > 0 && p.size > 5);
  }

  let enemies = [];
  let GroundSpawnTimer = 0;
  let FlyingSpawnTimer = 0;
  let GroundspawnInterval = 500;
  let FlyingspawnInterval = 500;
  let kills = 0;

  function handleEnemies(deltaTime) {    
    const state = player.currentState.state;
    lastEnemyX -= (3 + player.speed);
    if (lastEnemyX < canvas.width) lastEnemyX = canvas.width;
    enemies.forEach(enemy => {
    const isColliding = Collision.check(player, enemy)

    if(isColliding && (state === 'DIVING LEFT' || state === 'DIVING RIGHT' || state === 'ROLLING LEFT' || state === 'ROLLING RIGHT'|| state === 'AIRROLLING LEFT' || state === 'AIRROLLING RIGHT')) {
      playSFX('Hit');
      enemy.markedForDeletion = true;
      explosion.push(new Explosion(enemy.x, enemy.y));
      kills ++;
      player.energy.heal(5);
      player.energy.regen(25);
    } else if(isColliding) {
      playSFX('Hurt');
      enemy.markedForDeletion = true;
      explosion.push(new Explosion(enemy.x, enemy.y));
      player.energy.damage(15);
      player.energy.drain(5)
    }
    if(!enemy.markedForDeletion) {
      enemy.update(player.speed, deltaTime);
      enemy.draw(ctx, deltaTime);
    }
    });
    GroundSpawnTimer += deltaTime;
    FlyingSpawnTimer += deltaTime;
    if (GroundSpawnTimer >= GroundspawnInterval) {
      enemies.push(new GroundEnemy(canvas.width, canvas.height, groundMargin));
      GroundSpawnTimer = 0;
    }
    if (FlyingSpawnTimer >= FlyingspawnInterval) {
      enemies.push(new FlyingEnemies(canvas.width, canvas.height));
      FlyingSpawnTimer = 0;
    }

    
    enemies = enemies.filter(e => !e.markedForDeletion)
  }

  function handleExplosions(deltaTime) {
    explosion.forEach(exp => {
      exp.update(deltaTime, player.speed);
      exp.draw(ctx)
    });
      explosion = explosion.filter(e => !e.markedForDeletion);
  }

  const layer1 = new Layer(document.getElementById("layer1"), 0, canvas);
  const layer2 = new Layer(document.getElementById("layer2"), 0.1, canvas);
  const layer3 = new Layer(document.getElementById("layer3"), 0.2, canvas);
  const layer4 = new Layer(document.getElementById("layer4"), 0.3, canvas);
  const layer5 = new Layer(document.getElementById("layer5"), 0.6, canvas);

  const layers = [layer1, layer2, layer3, layer4, layer5];

    const pauseMenu = document.getElementById('pauseMenu');
    const resumeBtn = document.getElementById('resumeBtn')

    function calculateGame() {
      if(timeLeft <= 0 || kills !== killsGoal || player.energy.health <= 0) {
        screen = SCREEN.LOSE
      } else if(kills === killsGoal && timeLeft > 0 && player.energy.health > 0) {
        screen = SCREEN.WIN
      }
    }

  let lastTime = 0;
  const targetFPS = 60;
  const fpsInterval = 1000 / targetFPS;

  function animate(timeStamp) {

    requestAnimationFrame(animate);

    const deltaTime = timeStamp - lastTime;
    if (deltaTime >= fpsInterval) {
    lastTime = timeStamp - (deltaTime % fpsInterval);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(screen === SCREEN.START) menuManager.handleStart(ctx, deltaTime, layers, player);
    else if(screen === SCREEN.PAUSE) menuManager.handlePause(ctx, canvas, deltaTime, input, layers, player, enemies, drawStatus, timeLeft, initialTime, kills, killsGoal);
    if(screen === SCREEN.PLAYING) {
    layers.forEach((l) => {
      l.update(player.speed * 2);
      l.draw(ctx);
    });
    player.draw(ctx);
    player.updateAnimation(deltaTime);
    player.update(input.keys, deltaTime);
    handleEnemies(deltaTime);
    const state = player.currentState.state;
    if (state === "STANDING LEFT" || state === "STANDING RIGHT") {
      player.energy.regen(0.40);
    } else if (state === "SITTING LEFT" || state === "SITTING RIGHT") {
      player.energy.regen(1);
      player.energy.heal(0.01);
    } 
    handleExplosions(deltaTime);
    timeLeft -= deltaTime / 1000;
    if(timeLeft <= 0 || kills >= killsGoal || player.energy.health <= 0) calculateGame();
    player.energy.draw(ctx, 50, 105, 300, 20, deltaTime);
    player.energy.drawHealth(ctx, 50, 50, 300, 50)
    player.energy.drawTime(ctx, canvas, timeLeft, initialTime)
    player.energy.drawGoal(ctx, kills, killsGoal, canvas.width / 2 - 150, 75, 300, 40)
    handleParticles();
    drawStatus(ctx, input, player, canvas);
    }
  }
  }
  animate(0);
}
