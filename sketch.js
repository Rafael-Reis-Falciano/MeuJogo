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

function preload()
{
 fundo = loadImage("imagem fundo.jpg");
 personagemComeco = loadImage("sprite_0.png");
 personagemPulandoDireita = loadImage("sprite_1.png");
 personagemPulandoEsquerda = loadImage("sprite_2.png");
 personagemParedeDireita = loadImage("sprite_3.png");
 personagemParedeEsquerda = loadImage("sprite_4.png");
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

  paredeEsquerda = Bodies.rectangle(0, 0, 30, 1000, static_options);
  paredeDireita = Bodies.rectangle(350, 0, 30, 1000, static_options);
  World.add(world, paredeEsquerda);
  World.add(world, paredeDireita);

  solo = Bodies.rectangle(0, 580, 400, 1, static_options);
  World.add(world, solo);

  player = Bodies.rectangle(185, 70, 50, 50, player_options);
  World.add(world, player);

}

function draw()
{
  background("gray");
  Engine.update(engine);

  //image(fundo, 0, 0, width, height);

  if(player.position.y > 550)
  {
  image(personagemComeco, player.position.x, player.position.y, 50, 50);
  }
  rect(paredeEsquerda.position.x, paredeEsquerda.position.y, 50, 600);
  rect(paredeDireita.position.x, paredeDireita.position.y, 50, 600);

  colisao(paredeEsquerda);
  colisao(paredeDireita);
  movimentacao();
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
    image(personagemPulandoEsquerda, player.position.x, player.position.y, 50, 50);
  }

  if(player.position.y < 550 && direcaoPulo === right && player.position.x > 60)
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
      image(personagemParedeEsquerda, player.position.x, player.position.y, 50, 50);
    }
    if(p === paredeDireita)
    {
      direcaoPulo = left;
      image(personagemParedeDireita, player.position.x, player.position.y, 50, 50);
    }
  }

}








