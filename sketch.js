const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine, world;

var fundo;
var player;
var paredeEsquerda, paredeDireita, solo;
var colidiu = false;
var right = 0;
var left = 1;
var direcaoPulo = right;
var personagem1, personagem2, personagem3, personagem4, personagem5;
var parametroImg = "inicio";
var sawObstacle, laserObstacle, spikesObstacleE, spikesObstacleD;
var obstaculoSpikesE, obstaculoSpikesD, obstaculoLaser, obstaculoSerra;
var espinhos = [200, 400];
var lasers = [100, 300];
var serrasX = [70, 200, 330];
var serrasY = [50, 200, 350, 450];

function preload()
{
 fundo = loadImage("imagemFundo.jpg");
 personagemComeco = loadImage("sprite_0.png");
 personagemPulandoDireita = loadImage("sprite_1.png");
 personagemPulandoEsquerda = loadImage("sprite_2.png");
 personagemParedeDireita = loadImage("sprite_3.png");
 personagemParedeEsquerda = loadImage("sprite_4.png");
 sawObstacle = loadImage("SawObstacle.png");
 laserObstacle = loadImage("LaserObstacle.png");
 spikesObstacleE = loadImage("SpikesObstacle.png");
 spikesObstacleD = loadImage("SpikesObstacle2.png");
}

function setup()
{
  createCanvas(400, 600);

  engine = Engine.create();
  world = engine.world;

  var static_options = {
    isStatic: true,
  }

  var player_options = {
    restitution: 1,
    frictionAir: 0.05, 
  }

  paredeEsquerda = Bodies.rectangle(0, 0, 30, 10000, static_options);
  paredeDireita = Bodies.rectangle(370, 0, 30, 10000, static_options);
  World.add(world, paredeEsquerda);
  World.add(world, paredeDireita);

  solo = Bodies.rectangle(0, 580, 400, 1, static_options);
  World.add(world, solo);

  player = Bodies.rectangle(185, 550, 50, 50, player_options);
  World.add(world, player);

  obstaculoSpikesE = new Obstacles(40, Math.round(random(espinhos)), 25, 100, spikesObstacleE);
  obstaculoSpikesD = new Obstacles(360, Math.round(random(espinhos)), 25, 100, spikesObstacleD);
  //obstaculoLaser = new Obstacles(200, Math.round(random(lasers)), 500, 30, laserObstacle);
  obstaculoSerra = new Obstacles(Math.round(random(serrasX)), Math.round(random(serrasY)), 50, 50, sawObstacle);

}

function draw()
{
  background("gray");
  Engine.update(engine);

  push();
  imageMode(CENTER)
  image(fundo, 200, 300, 562, height);
  pop();

  if(player.position.y > 550)
  {
    parametroImg = "inicio";
  }

  if(parametroImg === "inicio")
  {
    image(personagemComeco, player.position.x, player.position.y, 50, 50);
  }

  rect(paredeEsquerda.position.x, paredeEsquerda.position.y, 30, 10000);
  rect(paredeDireita.position.x, paredeDireita.position.y, 30, 10000);

  colisao(paredeEsquerda);
  colisao(paredeDireita);
  movimentacao();

  camera.position.y = player.position.y;

  obstaculoSpikesE.show();
  obstaculoSpikesD.show();
  //obstaculoLaser.show();
  obstaculoSerra.show();
}

function movimentacao()
{
  if(keyDown("space") && direcaoPulo === right)
  {
    Matter.Body.setVelocity(player, {x: 12, y: -10});
  }

  if(keyDown("space") && direcaoPulo === left)
  {
    Matter.Body.setVelocity(player, {x: -12, y: -10});
  }

  if(player.position.y < 550 && direcaoPulo === left && player.position.x < 320)
  {
    parametroImg = "puloEsquerda";
  }

  if(parametroImg === "puloEsquerda")
  {
    image(personagemPulandoEsquerda, player.position.x, player.position.y, 50, 50);
  }

  if(player.position.y < 550 && direcaoPulo === right && player.position.x > 70)
  {
    parametroImg = "puloDireita";
  }

  if(parametroImg === "puloDireita")
  {
    image(personagemPulandoDireita, player.position.x, player.position.y, 50, 50);
  }
}

function colisao(p)
{
  var colidir = Matter.SAT.collides(player, p);

  if(colidir.collided)
  {
    //Matter.Body.setStatic(player, true);
    colidiu = true;

    if(colidiu = true){
      //Matter.Body.setStatic(player, false);
      Matter.Body.setVelocity(player, {x: 0, y: -0.2});
      setTimeout(() => {
        Matter.Body.setVelocity(player, {x: 0, y: 2})
      }, 2500)
    }

    if(p === paredeEsquerda)
    {
      direcaoPulo = right;
      parametroImg = "direita";
    }
    if(p === paredeDireita)
    {
      direcaoPulo = left;
      parametroImg = "esquerda";
    }
  }

  if(parametroImg === "direita")
  {
    image(personagemParedeEsquerda, player.position.x, player.position.y, 50, 50);
  }
  if(parametroImg === "esquerda")
  {
    image(personagemParedeDireita, player.position.x, player.position.y, 50, 50);
  }

}








