//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({ 
    width: 425, 
    height: 360,                       
    antialias: true, 
    transparent: false, 
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
app.loader.add('cat','images/cat.png').load(connect);

function connect() {
  socket.on('connect', () => {
    console.log("\n*** CONNECTED TO SOCKET *** ", socket.id);
    id = socket.id;
    socket.emit('ready')
  });
  
  socket.on('cat', () => {
    console.log('I need to cat again')
    setup();
  })
}

function setup() {
  const cat = new PIXI.Sprite(app.loader.resources.cat.texture)
  app.stage.addChild(cat)
  cat.x = Math.random()*400;
  cat.y = Math.random()*300;
}

const socket = io();
connect()