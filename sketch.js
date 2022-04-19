const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
var engine, world;

var fundo;
var player;
var parede1, parede2, solo;

function preload()
{

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

  parede1 = Bodies.rectangle(0, 0, 50, 1000, static_options);
  parede2 = Bodies.rectangle(350, 0, 50, 1000, static_options);
  World.add(world, parede1);
  World.add(world, parede2);

  solo = Bodies.rectangle(0, 580, 400, 1, static_options);
  World.add(world, solo);

  player = Bodies.rectangle(185, 70, 30, 40, player_options);
  World.add(world, player);

}

function draw()
{
  background("gray");
  Engine.update(engine);

  fill("red");
  rect(player.position.x, player.position.y, 30, 40);
  rect(parede1.position.x, parede1.position.y, 50, 600);
  rect(parede2.position.x, parede2.position.y, 50, 600);

  movimentacao();
  colisao(parede1);
  colisao(parede2);
}

function movimentacao()
{
  if(keyDown("space"))
  {
    Matter.Body.setVelocity(player, {x: 15, y: -15});
  }
}

function colisao(p)
{
  var colidir = Matter.SAT.collides(player, p);

  if(colidir.collided)
  {
    Matter.Body.setStatic(player, true);

    setTimeout(() => {
      Matter.Body.setStatic(player, false);
      Matter.Body.setVelocity(player, {x: 0, y:5});
    }, 1000)
  }
}








