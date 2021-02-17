//import pixi.js --> passed from html
//import socket.io --> passed from html
import { Logo } from './objects/logo.js'

//todo move this out
// let settings = {'scale': 2}

class Game {
  constructor() {
    this.app = new PIXI.Application({ width: 800, height: 600, antialias: true, transparent: false, resolution: 1});
    document.body.appendChild(this.app.view);

    // not used yet
    this.scenes = {
      lobby: {},
      play: {}
    }

    this.players = []

    //load assets
    this.app.loader.add('cat','images/cat.png')
    .load(()=> this.initGame());
  }

  initGame() {
    this.app.stage.addChild(Logo(this.app.renderer.width / 2, 20));
    this.initNetwork();
  }

  renderLobby() {
    let playerContainer = new PIXI.Container();

    for(let i = 0; i < this.players.length; i++) {
      let graphic = new PIXI.Graphics() 
      graphic.beginFill(0xff0000);
      playerContainer.addChild(graphic.drawShape(new PIXI.Circle(100*(i+1),100,10)));
      this.app.stage.addChild(playerContainer)
    }
  }

initNetwork() {
  const socket = io();
  console.log('assets loaded');
  socket.on('connect', () => {
    console.log("\n*** CONNECTED TO SOCKET *** ", socket.id);
  });
  socket.on('gamestate', (state) => {
    this.players = state
    this.renderLobby()
  });
};

  gameLoop() {}
}

export { Game }
