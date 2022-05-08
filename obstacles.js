class Obstacles
{
constructor(x,y,w,h,img)
{
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    var options = {
        isStatic: true,
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);
}

show()
{
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
}





























}