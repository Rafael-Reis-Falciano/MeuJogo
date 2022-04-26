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

function preload()
{
 fundo = loadImage("imagem fundo.jpg");
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

  paredeEsquerda = Bodies.rectangle(0, 0, 50, 1000, static_options);
  paredeDireita = Bodies.rectangle(350, 0, 50, 1000, static_options);
  World.add(world, paredeEsquerda);
  World.add(world, paredeDireita);

  solo = Bodies.rectangle(0, 580, 400, 1, static_options);
  World.add(world, solo);

  player = Bodies.rectangle(185, 70, 30, 40, player_options);
  World.add(world, player);

}

function draw()
{
  background("gray");
  Engine.update(engine);

  image(fundo, 0, 0, width, height);

  fill("red");
  rect(player.position.x, player.position.y, 30, 40);
  /*rect(paredeEsquerda.position.x, paredeEsquerda.position.y, 50, 600);
  rect(paredeDireita.position.x, paredeDireita.position.y, 50, 600);*/

  colisao(paredeEsquerda);
  colisao(paredeDireita);
  movimentacao();
}

function movimentacao()
{
  if(keyDown("space") && direcaoPulo === right)
  {
    Matter.Body.setVelocity(player, {x: 20, y: -10});
  }

  if(keyDown("space") && direcaoPulo === left)
  {
    Matter.Body.setVelocity(player, {x: -20, y: -10});
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
    }
    if(p === paredeDireita)
    {
      direcaoPulo = left;
    }
  }

}








