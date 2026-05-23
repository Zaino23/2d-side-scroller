export class MenuManager {
  constructor(screen, SCREEN, playSFX, ui, initialTime, timeLeft, killsGoal, setToPlaying, updateScreen) {
        this.startBtn = document.getElementById('startBtn');
        this.startMenu = document.getElementById('startMenu');
        this.selectMenu = document.getElementById('selectMenu');
        this.pauseMenu = document.getElementById('pauseMenu');
        this.resumeBtn = document.getElementById('resumeBtn');
        this.btns = {
          startBtn: document.querySelectorAll('.Sbtn'),
          selectBtn: document.querySelectorAll('.select'),
          pauseBtn: document.querySelectorAll('.Pbtn')
        }
        this.screen = screen;
        this.SCREEN = SCREEN;
        this.ui = ui

            window.addEventListener('keydown', (e) => {
              if(this.screen !== this.SCREEN.START && this.screen !== this.SCREEN.PAUSE) return;
              this.ui.handleMenuInput(e.key, this.screen);
            })
        
            this.btns.startBtn.forEach(btn => {
              btn.addEventListener('mouseenter', () => {
                if(btn.classList.contains('selected')) return;
                playSFX('Select')
              })
            })
            this.btns.pauseBtn.forEach(btn => {
              btn.addEventListener('mouseenter', () => {
                if(btn.classList.contains('selected')) return;
                playSFX('Select')
              })
            })

            this.btns.selectBtn.forEach(btn => {
              btn.addEventListener('mouseenter', () => {
                if(btn.classList.contains('selected')) return;
                playSFX('Select')
              })
            });
        
            startBtn.addEventListener('click', () => {
              if(this.screen !== this.SCREEN.START) return;
              this.screen = this.SCREEN.SELECTING
              this.selectMenu.classList.toggle('hide')
              this.startMenu.classList.toggle('hide')
              playSFX('Selected')
            });
            window.addEventListener('keydown', (e) => {
              if(e.key.toUpperCase() !== 'ENTER') return;
              if(this.screen === this.SCREEN.START &&this.ui.selectedIndex === 0) {
                this.screen = this.SCREEN.SELECTING
                this.selectMenu.classList.toggle('hide')
                this.startMenu.classList.toggle('hide')
                playSFX('Selected')
              } else if(this.screen === this.SCREEN.PAUSE) {
                this.screen = this.SCREEN.PLAYING;
                this.pauseMenu.classList.toggle('hide');
                updateScreen(this.screen);
                playSFX('Selected')
              }
            });

              this.btns.selectBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                if(this.screen !== this.SCREEN.SELECTING) return;
                if(btn.id === 'select1') {timeLeft = 30; initialTime = timeLeft; killsGoal = 60;}
                if(btn.id === 'select2') {timeLeft = 30; initialTime = timeLeft; killsGoal = 120;}
                if(btn.id === 'select3') {timeLeft = 60; initialTime = timeLeft; killsGoal = 240;}
                this.selectMenu.classList.toggle('hide')
                this.screen = this.SCREEN.PLAYING;
                setToPlaying(this.screen, initialTime, timeLeft, killsGoal);
                playSFX('Selected')
                });
              });

              window.addEventListener('keydown', (e) => {
                if(e.key.toUpperCase() !== 'ESCAPE') return;
                if(this.screen === this.SCREEN.PLAYING) {
                this.screen = this.SCREEN.PAUSE;
                updateScreen(this.screen);
                this.ui.selectedIndex = 0;
                this.ui.updateSelection(this.screen);
                }
              });
    
            this.resumeBtn.addEventListener('click', () => {
              this.screen = this.SCREEN.PLAYING;
              updateScreen(this.screen)
              this.pauseMenu.classList.add('hide');
              this.ui.updateSelection(screen)
            });
  }
  handleStart(ctx, deltaTime, layers, player) {
      if(this.screen !== this.SCREEN.START && this.screen !== this.SCREEN.SELECTING) return;
      ctx.save()
      ctx.filter = 'blur(10px)';
      layers.forEach((l) => {
        l.update(3);
        l.draw(ctx);
      });
      player.draw(ctx, deltaTime);
      player.updateAnimation(deltaTime);
      player.setState(5)
      ctx.restore()
  }
  handlePause(ctx, canvas, deltaTime, input, layers, player, enemies, drawStatus, timeLeft, initialTime, kills, killsGoal) {
          if(this.screen !== this.SCREEN.PAUSE) return;
          this.pauseMenu.classList.remove('hide')
          ctx.save();
          ctx.filter = 'blur(8px)'
          layers.forEach((l) => {
            l.draw(ctx);
          });
          player.draw(ctx)
            enemies.forEach((e) => {
              e.draw(ctx)
          });
          player.energy.draw(ctx, 50, 105, 300, 20, deltaTime);
          player.energy.drawHealth(ctx, 50, 50, 300, 50)
          player.energy.drawTime(ctx, canvas, timeLeft, initialTime)
          player.energy.drawGoal(ctx, kills, killsGoal, canvas.width / 2 - 150, 75, 300, 40)
          drawStatus(ctx, input, player, canvas);
          ctx.restore();
  }
}