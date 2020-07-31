//global variables
let quantity = 100;

//canvas
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

//canvas general control
ctx.width = 800;
ctx.height = 800;

const clear = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(clear);
};
clear();

function Entity(color, x, y, size, weight) {
  this.cx = x || canvas.width / 2;
  this.cy = y || canvas.height / 2;
  this.r = size || 30;
  this.rad = Math.PI * 2;
  this.color = color || "skyblue";
  this.weight = weight;
  this.speedY = 0.5 + this.weight;
  this.speedX = 0.5 + this.weight;

  this.display = () => {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.cx, this.cy, this.r, 0, this.rad);
    ctx.fill();
  };
  this.getBoundary = () => {
    if (this.cx - this.r < 0) {
      this.speedX = -this.speedX;
    } else if (this.cx + this.r > canvas.width) {
      this.speedX = -this.speedX;
    } else if (this.cy + this.r > canvas.height) {
      //slow down a bit for gravity
      //   this.speedY = 3;
      this.speedY = -this.speedY;
    } else if (this.cy - this.r < 0) {
      //speed up a bit for gravity
      //   this.speedY = -4 - this.weight;
      this.speedY = -this.speedY;
    } else {
      return;
    }
  };

  this.step = () => {
    this.cx += this.speedX;
    this.cy += this.speedY;

    this.getBoundary();
  };
  this.move = () => {
    requestAnimationFrame(() => {
      this.step();
      this.display();
      this.move();
    });
  };
}

for (let i = 0; i < quantity; i++) {
  const red = Math.random() * 360;
  const blue = Math.random() * 360;
  const green = Math.random() * 360;
  const opa = Math.random();
  const x = Math.random() * 150;
  const y = Math.random() * 90;
  const r = Math.random() * 10;
  const weight = r / 10;

  const myBall = new Entity(
    `rgba(${red}, ${blue}, ${green}, ${opa})`,
    x,
    y,
    r,
    weight
  );

  myBall.move();
}
// const myBall1 = new Entity("green", 100, 100, 30);
// const myBall2 = new Entity("red", 150, 50, 20);
// console.log(myBall1);
// console.log(myBall2);
// myBall1.move();
// myBall2.move();
