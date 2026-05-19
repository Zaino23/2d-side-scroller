import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatus } from "./utils.js";
import { FireParticles } from "./particles.js";
import Layer from "./background.js";
import { GroundEnemy, FlyingEnemies } from "./enemies.js";
import Collision from "./collision.js";

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
  let particles = [];

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
          player.y + player.height / 2,
        ),
      );
    }
    if (player.diveLanded) {
      for (let i = 0; i < 3; i++) {
        particles.push(
          new FireParticles(
            player.x + player.width / 2,
            player.y + player.height * 0.2,
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
  let GroundspawnInterval = 1500;
  let FlyingspawnInterval = 1000;

  function handleEnemies(deltaTime) {
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
    const state = player.currentState.state;
    enemies.forEach(enemy => {
      enemy.update(player.speed, deltaTime);
      enemy.draw(ctx, deltaTime);

    if(Collision.check(player, enemy) && (state === 'DIVING LEFT' || state === 'DIVING RIGHT' || state === 'ROLLING LEFT' || state === 'ROLLING RIGHT'|| state === 'AIRROLLING LEFT' || state === 'AIRROLLING RIGHT')) {
      enemy.markedForDeletion = true;
      player.energy.heal(5)
      player.energy.regen(25);
    } else if(Collision.check(player, enemy)) {
      enemy.markedForDeletion = true;
      player.energy.damage(15);
      player.energy.drain(5)
    }
    });

    enemies = enemies.filter((e) => !e.markedForDeletion);
  }

  const layer1 = new Layer(document.getElementById("layer1"), 0, canvas);
  const layer2 = new Layer(document.getElementById("layer2"), 0.1, canvas);
  const layer3 = new Layer(document.getElementById("layer3"), 0.2, canvas);
  const layer4 = new Layer(document.getElementById("layer4"), 0.3, canvas);
  const layer5 = new Layer(document.getElementById("layer5"), 0.6, canvas);

  const layers = [layer1, layer2, layer3, layer4, layer5];

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layers.forEach((l) => {
      l.update(player.speed * 2);
      l.draw(ctx);
    });
    player.draw(ctx, deltaTime);
    player.update(input.keys, deltaTime);
    handleEnemies(deltaTime);
    const state = player.currentState.state;
    if (state === "STANDING LEFT" || state === "STANDING RIGHT") {
      player.energy.regen(0.15);
    } else if (state === "SITTING LEFT" || state === "SITTING RIGHT") {
      player.energy.regen(0.3);
      player.energy.heal(0.005);
    } /* else if(state === 'JUMPING LEFT' || state === 'JUMPING RIGHT' || state === 'FALLING LEFT' || state === 'FALLING RIGHT') {
      player.energy.drain(0.01);
    } else if(state === 'RUNNING LEFT' || state === 'RUNNING RIGHT') {
      player.energy.drain(0.008)
    } */ // for now i dont want these
    player.energy.draw(ctx, 250, 130, 300, 20, deltaTime);
    player.energy.drawHealth(ctx, 250, 70, 300, 50)
    handleParticles();
    drawStatus(ctx, input, player);
    requestAnimationFrame(animate);
  }
  animate(0);
};
