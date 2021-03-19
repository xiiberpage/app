/*
* File Name / sunset.js
* Created Date / Sep 22, 2020
* Aurhor / Toshiya Marukubo
* Twitter / https://twitter.com/toshiyamarukubo
*/

/*
  Common Tool.
*/

class Tool {
  // random number.
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  // random color rgb.
  static randomColorRGB() {
    return (
      "rgb(" +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ", " +
      this.randomNumber(0, 255) +
      ")"
    );
  }
  // random color hsl.
  static randomColorHSL(hue, saturation, lightness) {
    return (
      "hsl(" +
      hue +
      ", " +
      saturation +
      "%, " +
      lightness +
      "%)"
    );
  }
  // gradient color.
  static gradientColor(ctx, cr, cg, cb, ca, x, y, r) {
    const col = cr + "," + cg + "," + cb;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, "rgba(" + col + ", " + (ca * 1) + ")");
    g.addColorStop(0.5, "rgba(" + col + ", " + (ca * 0.5) + ")");
    g.addColorStop(1, "rgba(" + col + ", " + (ca * 0) + ")");
    return g;
  }
}

/*
  When want to use angle.
*/

class Angle {
  constructor(angle) {
    this.a = angle;
    this.rad = this.a * Math.PI / 180;
  }

  incDec(num) {
    this.a += num;
    this.rad = this.a * Math.PI / 180;
    return this.rad;
  }
}

/*
  When want to use controller.
*/

class Controller {
  constructor(id) {
    this.id = document.getElementById(id);
  }
  getVal() {
    return this.id.value;
  }
}

/*
  When want to use time.
*/

class Time {
  constructor(time) {
    this.startTime = time;
    this.lastTime;
    this.elapsedTime;
  }

  getElapsedTime() {
    this.lastTime = Date.now();
    this.elapsedTime = (this.startTime - this.lastTime) * -1;
    return this.elapsedTime;
  }
}

let canvas;
let offCanvas;

class Canvas {
  constructor(bool) {
    // create canvas.
    this.canvas = document.createElement("canvas");
    // if on screen.
    if (bool === true) {
      this.canvas.style.display = 'block';
      this.canvas.style.top = 0;
      this.canvas.style.left = 0;
      document.getElementsByTagName("body")[0].appendChild(this.canvas);
    }
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    // mouse infomation.
    this.mouseX = null;
    this.mouseY = null;
    // tree
    this.trees = [];
    this.xPos = 0;
    // sun
    this.sunNum = 10;
    this.suns = [];
    // ground
    this.groundNum = 1;
    this.grounds = [];
    // car
    this.carNum = 1;
    this.cars = [];
    // bird
    this.birdNum = 10;
    this.birds = [];
    // time
    this.time = new Time(new Date());
    // style
    this.g = {
      one: 0,
      two: 33.3,
      three: 66.6
    };
    // behavior
    this.carBehavior = 0;
  }
 
  // init, render, resize
  init() {
    // init
    this.trees = [];
    this.xPos = 0;
    this.suns = [];
    this.grounds = [];
    this.cars = [];
    this.birds = [];
    this.time = new Time(new Date());
    this.g = {
      one: 0,
      two: 33.3,
      three: 66.6
    };
    this.carBehavior = 0;
    // tree
    for (this.xPos = 0; this.xPos < this.width + 40;) {
      let rand = Tool.randomNumber(80, 130);
      const t = new Tree(this.ctx, this.xPos, this.height - this.height / 5);
      this.trees.push(t);
      this.xPos += rand;
    }
    // sun
    for (let i = 0; i < this.sunNum; i++) {
      const s = new Sun(this.ctx, this.width / 2, this.height / 2);
      this.suns.push(s);
    }
    // car
    for (let i = 0; i < this.carNum; i++) {
      const c = new Car(this.ctx, this.width / 2, this.height - this.height / 5);
      this.cars.push(c);
    }
    // bird
    for (let i = 0; i < this.birdNum; i++) {
      const b = new Bird(this.ctx, Tool.randomNumber(0, this.width), Tool.randomNumber(0, -this.height / 2));
      this.birds.push(b);
    }
    // ground
    let g = new Ground(this.ctx, 0, this.height - this.height / 5);
    this.grounds.push(g);
  }

  render() {
    const e = this.time.getElapsedTime();
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (e > 2400) {
      for(let i = 0; i < this.suns.length; i++) {
        this.suns[i].render();
      }
    }
    if (e > 3200) {
      for(let i = 0; i < this.birds.length; i++) {
        this.birds[i].render();
      }
    }
    if (e > 800) {
      for(let i = 0; i < this.trees.length; i++) {
        this.trees[i].render();
      }
    }
    if (e > 1600) {
      for(let i = 0; i < this.cars.length; i++) {
        this.cars[i].render();
      }
    }
    for(let i = 0; i < this.grounds.length; i++) {
      this.grounds[i].render();
    }
  }
  
  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.init();
  }
}

/*
  style background
*/

function gradientBackground() {
  canvas.canvas.style.background = '-webkit-linear-gradient(#1a2a6c ' + canvas.g.one + '%, #b21f1f ' + canvas.g.two + '%, #fdbb2d ' + canvas.g.three + '%)';
  canvas.canvas.style.background = 'linear-gradient(#1a2a6c ' + canvas.g.one + '%, #b21f1f ' + canvas.g.two + '%, #fdbb2d ' + canvas.g.three + '%)';
  canvas.g.one += 0.05;
  canvas.g.two += 0.05;
  canvas.g.three += 0.05; 
}


/*
  Bird class
*/

class Bird {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.init(x, y);
  }

  init(x, y) {
    this.x = x;
    this.y = y;
    this.r = Tool.randomNumber(10, 100);
    this.c = 'rgb(166, 66, 94)';
    this.a = new Angle(Tool.randomNumber(0, 360));
    this.a1 = new Angle(Tool.randomNumber(-30, 30));
    this.v = {
      x: 0,
      y: 0
    };
    this.ga = 1;
    this.rand = Tool.randomNumber(100, 2000);
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.lineWidth = this.r / 15;
    ctx.lineCap = 'round';
    ctx.globalAlpha = this.ga;
    ctx.strokeStyle = this.c;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.a1.rad);
    ctx.translate(-this.x, -this.y);
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(this.x + this.r / 2, Math.sin(this.a.rad) * this.r / 3 + this.y - this.r / 2, this.x + this.r, Math.sin(this.a.rad) * -this.r / 10 + this.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.quadraticCurveTo(this.x - this.r / 2, Math.sin(this.a.rad) * this.r / 3 + this.y - this.r / 2, this.x - this.r, Math.sin(this.a.rad) * -this.r / 10 + this.y);
    ctx.stroke();
    ctx.restore();
  }

  updateParams() {
    this.a.incDec(2);
    this.r *= 0.999;
    this.ga *= 0.999;
    if (this.ga < 0.2) {
      this.init(Tool.randomNumber(0, canvas.width), Tool.randomNumber(0, -canvas.height / 5));
    }
  }

  updatePosition() {
    this.v.x = canvas.width / 2 - this.x;
    this.v.y = canvas.height / 2 - this.y;
    this.x += this.v.x / this.rand;
    this.y += this.v.y / this.rand;
  }
  
  render() {
    this.draw();
    this.updateParams();
    this.updatePosition();
  }
}

/*
  Car class
*/

class Car {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.init(x, y);
  }

  init(x, y) {
    this.x = -50;
    this.y = y;
    this.r = 50;
    this.c = 'rgb(166, 66, 94)';
    this.v = {
      x: 0,
      y: 0
    };
    this.coll = false;
    this.fontSize = 50;
    this.text = 'Xiiber';
    this.time;
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.c;
    ctx.strokeStyle = this.c;
    ctx.lineWidth = this.r / 15;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.r / 8);
    ctx.lineTo(this.x + this.r, this.y - this.r / 8);
    ctx.lineTo(this.x + this.r, this.y - this.r / 2);
    ctx.lineTo(this.x + this.r - this.r / 5, this.y - this.r);
    ctx.lineTo(this.x - this.r, this.y - this.r);
    ctx.lineTo(this.x - this.r, this.y - this.r / 8);
    ctx.closePath();
    ctx.fill();
    // wheel
    ctx.beginPath();
    ctx.arc(this.x + this.r / 1.5, this.y - this.r / 8, this.r / 8, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x - this.r / 1.5, this.y - this.r / 8, this.r / 8, 0, Math.PI * 2, false);
    ctx.fill();
    // window
    ctx.fillStyle = 'rgb(243, 110, 62)';
    ctx.fillRect(this.x - this.r / 1.1, this.y - this.r / 1.1, this.r / 3, this.r / 3);
    ctx.fillRect(this.x - this.r / 2, this.y - this.r / 1.1, this.r / 3, this.r / 3);
    ctx.fillRect(this.x, this.y - this.r / 1.1, this.r / 3, this.r / 3);
    ctx.fillRect(this.x + this.r / 2.5, this.y - this.r / 1.1, this.r / 3, this.r / 3);
    // surf board
    ctx.beginPath();
    ctx.moveTo(this.x - this.r, this.y - this.r * 1.1);
    ctx.lineTo(this.x + this.r, this.y - this.r * 1.1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(this.x - this.r / 1.3, this.y - this.r * 1.1);
    ctx.lineTo(this.x - this.r / 1.2, this.y - this.r * 1.3);
    ctx.stroke();
    // light and mes
    if (canvas.carBehavior >= 1) {
      ctx.fillStyle = 'yellow';
      ctx.globalAlpha = 0.6;
      ctx.beginPath();
      ctx.moveTo(this.x + this.r, this.y - this.r / 3);
      ctx.lineTo(this.x + this.r * 4, this.y - this.r / 3 - this.r / 3);
      ctx.lineTo(this.x + this.r * 4, this.y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = 'white';
      ctx.font = this.fontSize + "px sans-selif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.text, this.x, this.y - this.r * 2);
    }
    ctx.restore();
  }

  updatePosition() {
    this.v.x += (canvas.width / 2 - this.x) * 0.3;
    this.v.x *= 0.9;
    this.x += this.v.x;
    if (canvas.suns[0].y > canvas.height) {
      canvas.carBehavior = 1;
      this.time = new Time(new Date());
    }
  }

  forwardPosition() {
    this.y += this.v.y;
    if (this.y < canvas.height - canvas.height / 5) {
      this.v.y += 0.5;
      this.y += this.v.y;
    } else {
      this.y = canvas.height - canvas.height / 5;
    }
    this.v.x += 0.8;
    this.x += this.v.x;
  }

  collWall() {
    if (this.x + this.r > canvas.width) {
      this.coll = true;
      this.text += '!';
      this.x = canvas.width - this.r;
      this.v.x *= -0.9;
      this.v.y = Math.sin(Tool.randomNumber(180, 270) * Math.PI / 180) * 10;
    }
  }

  wrapPosition() {
    if (this.y < 0) {
      canvas.carBehavior = 2;
      this.time = new Time(new Date());
      this.x = 0 - this.r;
      this.y = canvas.height - canvas.height / 5;
    }
  }

  returnPosition() {
    this.v.x += 1;
    if (this.x > this.r * 1.5 && this.x < this.r * 2.5) {
      this.v.x = 0;
      this.text = 'Xiiber';
    }
    this.x += this.v.x;
  }

  render() {
    this.draw();
    if (canvas.carBehavior === 0) {
      this.updatePosition();
    }
    if (canvas.carBehavior === 1) {
      const e = this.time.getElapsedTime();
      if (e > 1000) {
        this.forwardPosition();
        this.collWall();
        this.wrapPosition();
      }
    }
    if (canvas.carBehavior === 2) {
      this.returnPosition();
      const e = this.time.getElapsedTime();
      if (e > 2000) {
        this.time = new Time(new Date());
        canvas.carBehavior = 3;
      }
    }
    if (canvas.carBehavior === 3) {
      this.text = "xiiber.com";
      const e = this.time.getElapsedTime();
      if (e > 500) {
        this.forwardPosition();
        if (this.x + this.r > canvas.width) {
          this.x = canvas.width - this.r;
          this.v.x *= -1;
          this.v.y = Math.sin(Tool.randomNumber(270, 270) * Math.PI / 180) * 20;
        }
      }
    }
    if (this.y < 0) {
      canvas.init();
    }
  }
}

/*
  Ground class
*/

class Ground {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.init(x, y);
  }

  init(x, y, c, i) {
    this.x = x;
    this.y = 0;
    this.c = 'rgb(166, 66, 94)';
    this.i = i;
    this.vy = 0;
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x, this.y, canvas.width, canvas.height);
    ctx.restore();
  }
  
  updateParams() {
    this.vy += ((canvas.height - canvas.height / 5) - this.y) * 0.3;
    this.vy *= 0.8;
    this.y += this.vy;
  }

  render() {
    this.draw();
    this.updateParams();
  }
}

/*
  Tree class.
*/

class Tree {
  constructor(ctx, x, y, c) {
    this.ctx = ctx;
    this.init(x, y, c);
  }

  init(x, y, c) {
    this.x = x;
    this.y = 0;
    this.vy = 0;
    this.h = Tool.randomNumber(100, 150);
    this.c = 'rgb(166, 66, 94)';
    this.rad = Tool.randomNumber(130, 150);
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.c;
    ctx.beginPath();
    ctx.moveTo(this.x + this.h / 20, this.y);
    ctx.lineTo(this.x, this.y - this.h);
    ctx.lineTo(this.x - this.h / 20, this.y);
    ctx.fill();
    ctx.translate(this.x, this.y - this.h);
    ctx.rotate(this.rad * Math.PI / 180);
    ctx.translate(-this.x, -this.y + this.h);
    for (let i = 0; i < 3; i++) {
      ctx.translate(this.x, this.y - this.h);
      ctx.rotate(-60 * Math.PI / 180);
      ctx.translate(-this.x, -this.y + this.h);
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.h);
      ctx.quadraticCurveTo(this.x + this.h / 4, this.y - this.h - this.h / 2, this.x + this.h / 2, this.y - this.h);
      ctx.quadraticCurveTo(this.x + this.h / 4, this.y - this.h - this.h / 6, this.x, this.y - this.h);
      ctx.fill();
    }
    ctx.translate(this.x, this.y - this.h);
    ctx.rotate(this.rad * Math.PI / 180);
    ctx.translate(-this.x, -this.y + this.h);
    for (let i = 0; i < 3; i++) {
      ctx.translate(this.x, this.y - this.h);
      ctx.rotate(-60 * Math.PI / 180);
      ctx.translate(-this.x, -this.y + this.h);
      ctx.beginPath();
      ctx.moveTo(this.x, this.y - this.h);
      ctx.quadraticCurveTo(this.x - this.h / 4, this.y - this.h - this.h / 2, this.x - this.h / 2, this.y - this.h);
      ctx.quadraticCurveTo(this.x - this.h / 4, this.y - this.h - this.h / 6, this.x, this.y - this.h);
      ctx.fill();
    }
    ctx.restore();
  }

  wrapPosition() {
    if (this.x + this.h / 2 < 0) this.x = canvas.width + this.h / 2;
  }

  updatePosition() {
    this.x -= 0.1;
  }

  updateParams() {
    this.vy += ((canvas.height - canvas.height / 5) - this.y) * 0.3;
    this.vy *= 0.8;
    this.y += this.vy;
  }

  render() {
    this.draw();
    this.updatePosition();
    this.updateParams();
    this.wrapPosition();
  }
}

/*
  Sun Class
*/

class Sun {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.init(x, y);
  }

  init(x, y) {
    this.x = x;
    this.y = y;
    this.r = 0;
    this.maxR = Tool.randomNumber(150, 250);
    this.vr = 0;
    this.c = {
      r: Tool.randomNumber(200, 255),
      g: Tool.randomNumber(200, 255),
      b: Tool.randomNumber(0, 50),
      a: 1
    };
  }
  
  draw() {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = Tool.gradientColor(this.ctx, this.c.r, this.c.g, this.c.b, this.c.a, this.x, this.y, this.r);
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.restore();
  }

  updateParams() {
    this.vr += (this.maxR - this.r) * 0.3;
    this.vr *= 0.8;
    this.r += this.vr;
    this.y += 0.5;
  }

  render() {
    this.draw();
    this.updateParams();
  }
}

(function () {
  "use strict";
  window.addEventListener("load", function () {
    canvas = new Canvas(true);
    canvas.init();
    
    function render() {
      window.requestAnimationFrame(function () {
        gradientBackground();
        canvas.render();
        render();
      });
    }
    
    render();

    // event
    window.addEventListener("resize", function () {
      canvas.resize();
    }, false);
  });
})();