import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatus } from "./utils.js";
import { FireParticles } from "./partcles.js";
import Layer from "./background.js";

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d');
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const loading = document.getElementById('loading')
  loading.style.display = 'none';

  const player = new Player(canvas.width, canvas.height);
  const input = new InputHandler();
  let particles = [];
  function handleParticles() {
    if(player.currentState.state === 'DIVING LEFT' ||
       player.currentState.state === 'DIVING RIGHT' 
    ) {
      particles.push(new FireParticles(player.x + player.width / 2, player.y + player.height * 0.2))
    } else if(player.currentState.state === 'ROLLING RIGHT') {
      particles.push(new FireParticles(player.x  , player.y + player.height / 2))
    } else if(player.currentState.state === 'ROLLING LEFT') {
      particles.push(new FireParticles(player.x + player.width, player.y + player.height / 2))
    }
    if(player.diveLanded) {
      for (let i = 0; i < 3; i++) {
        particles.push(new FireParticles(player.x + player.width / 2, player.y + player.height * 0.2))
      }
      player.diveLanded = false;
    }

    particles.forEach(p => {p.update();p.draw(ctx);});
    particles = particles.filter(p => p.alpha > 0 && p.size > 5);
  }

  const layer1 = new Layer(document.getElementById('layer1'), 0.2, canvas);
  const layer2 = new Layer(document.getElementById('layer2'), 0.3, canvas);
  const layer3 = new Layer(document.getElementById('layer3'), 0.4, canvas);
  const layer4 = new Layer(document.getElementById('layer4'), 0.6, canvas);
  const layer5 = new Layer(document.getElementById('layer5'), 0.7, canvas);

  const layers = [layer1, layer2, layer3, layer4, layer5]
  let gameSpeed = 7;
  
  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    layers.forEach(l => {
      l.update(player.speed);
      l.draw(ctx)
    });
    player.draw(ctx, deltaTime);
    player.update(input.keys, deltaTime);
    handleParticles();
    drawStatus(ctx, input, player)
    requestAnimationFrame(animate)
  }
  animate(0);
}