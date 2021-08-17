var PLAY=1;
var END=0;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var pisoinvisible;
var alternativo;
var cloudImage;
var obstaculos;
var obstaculo1;
var obstaculo2;
var obstaculo3;
var obstaculo4;
var obstaculo5;
var obstaculo6;
var numeros;
var puntaje=0;
var grupodeobstaculos;
var grupodenubes;
var estadodejuego=PLAY;
var gameover;
var restart;
var gameoverImg;
var restartImg;
var soundtrex;
var soundbounce;
var soundpuntaje;

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");

  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstaculo1 = loadImage("obstacle1.png");
  obstaculo2 = loadImage("obstacle2.png");
  obstaculo3 = loadImage("obstacle3.png");
  obstaculo4 = loadImage("obstacle4.png");
  obstaculo5 = loadImage("obstacle5.png");
  obstaculo6 = loadImage("obstacle6.png");
  
  gameoverImg = loadImage ("gameOver.png");
  restartImg = loadImage ("restart.png");
  soundtrex = loadSound("jump.mp3");
  soundbounce = loadSound("die.mp3");
  soundpuntaje = loadSound("checkPoint.mp3");
  
}
function crearnubes(){
  if (frameCount%50===0){
    
  
  nube = createSprite(600,100,20,50);
  nube.addImage(cloudImage);
  nube.y = Math.round(random(20,100));
  nube.velocityX = -3;
  nube.lifetime = 210;
  nube.scale=0.5;
  //console.log(nube.depth);
  nube.depth=trex.depth; 
  trex.depth=trex.depth+1;
  grupodenubes.add(nube);
  }}
 function crearobstaculos(){
 if (frameCount%50===0){
 obstaculos = createSprite(610,160,20,50);
 obstaculos.velocityX=-(4+puntaje/100);
 numeros = Math.round(random(1,6));
 switch (numeros){
   case 1:obstaculos.addImage(obstaculo1);
   break;
   case 2:obstaculos.addImage(obstaculo2);
   break;
   case 3:obstaculos.addImage(obstaculo3);
   break;
   case 4:obstaculos.addImage(obstaculo4);
   break;
   case 5:obstaculos.addImage(obstaculo5);
   break;
   case 6:obstaculos.addImage(obstaculo6);
   break;
   default:break;    
   
 }
   obstaculos.scale = 0.5;     
   obstaculos.lifetime = 210;
   grupodeobstaculos.add(obstaculos);
  }
   
 }
 function setup() {
  createCanvas(600, 200);
  

  //crea el sprite del Trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trexcollide",trex_collided);
  trex.scale = 0.5;
  trex.debug = true;
   
  //crea el sprite del suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  pisoinvisible = createSprite (200,195,400,10);
  pisoinvisible.visible = false;
  alternativo = Math.round(random(1,111));
   
  grupodeobstaculos=new Group();
  grupodenubes=new Group();
  trex.setCollider("circle",0,0,40);
  //trex.setCollider("rectangle",0,0,130,trex.height);
   
  gameover = createSprite(300,100,100,40);
  gameover.addImage("gameover",gameoverImg);
  restart = createSprite(300,150,20,40);
  restart.addImage("restart",restartImg);
  gameover.scale = 0.5;
  restart.scale = 0.5;
}

function draw() {
  background(140);
  text("puntaje: "+puntaje,500,40);
  if(estadodejuego===PLAY){
     ground.velocityX = -4;
     gameover.visible=false;
     restart.visible=false;
  //salta cuando se presiona la barra espaciadora
    if (keyDown("space")&& trex.y>=140) {       
      trex.velocityY = -10;
      soundtrex.play();
    }
     trex.velocityY = trex.velocityY + 0.8;
      //Junta los pisos
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }
    crearnubes();
    crearobstaculos();
    puntaje=puntaje+Math.round(getFrameRate()/70);
    if (puntaje>0&&puntaje%100===0){
    soundpuntaje.play();
    }
    if(grupodeobstaculos.isTouching(trex)){
    estadodejuego=END;   
    soundbounce.play();
      //trex.velocityY=-10;
      //soundtrex.play();
       }
     }
  else if(estadodejuego===END){
       gameover.visible=true;
       restart.visible=true;
       ground.velocityX = 0;   
       trex.velocityY = 0;
       trex.changeAnimation("trexcollide",trex_collided);
       grupodeobstaculos.setVelocityXEach(0);  
       grupodenubes.setVelocityXEach(0); 
       grupodeobstaculos.setLifetimeEach(-1);
       grupodenubes.setLifetimeEach(-1);
       if(mousePressedOver(restart)){
       console.log("funcionar");
       reset();
  }
       
          }
  //console.log(trex.depth);
 
  //Para trex no se caiga
  trex.collide(pisoinvisible);
  
  
  drawSprites();
  }
  function reset(){
  estadodejuego=PLAY;
  restart.visible=false;
  gameover.visible=false;
  grupodeobstaculos.destroyEach();
  grupodenubes.destroyEach();
  trex.changeAnimation("running", trex_running);  
  puntaje=0;
  }
