let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

// Create gradient
let grd = ctx.createRadialGradient(75,50,5,90,60,100);
grd.addColorStop(0, "red");
grd.addColorStop(1, "blue");

class Point {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}

const width = 300, height = 500, 
      playerSpeed = 2, enemySpeed = 1;

let keyList = {},
    player = new Point(width/2, height/2),
    enemies = [],
    alive = true;

for (let i=0; i<40; i++) {
  let enemy = new Point(Math.random() * width, Math.random() * height - height);
  enemies.push(enemy);
}

function drawPlayer() {
  ctx.fillStyle = grd;
  ctx.fillRect(player.x-5, player.y-5, 10, 10);
}

function drawEnemy() {
  ctx.fillStyle = "black";
  for (let enemy of enemies) {
    enemy.y = enemy.y + enemySpeed;
    if (enemy.y > height) {
      enemy.y %= height;
      enemy.x = Math.random() * width;
    }
    ctx.fillRect(enemy.x-5, enemy.y-5, 10, 10);
    
    if (Math.abs(player.x - enemy.x) < 10 && Math.abs(player.y - enemy.y) < 10) {
      alive = false;
    }
  }
}

function clear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
}

function drawAll() {
  clear();
  drawEnemy();
  if (alive === true) {
    drawPlayer();
  } else {
    ctx.font = "30px Comic Sans MS";
    ctx.fillStyle = "red";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", width/2, height/2);
  }
}

function changePositions() {
  for (let enemy of enemies) {
    enemy.y = (enemy.y + 1) % height;
  }
  playerMove();
}


$("#btn").click(function(){
  alive = true;
  setInterval(function() {
    changePositions();
    drawAll();
  }, 10);
});


/* 
多个方向键同时响应
http://www.fengfly.com/plus/view-40190-1.html
*/
$(document).keydown(e => {
  keyList[e.keyCode] = true;
  playerMove();
});

$(document).keyup(e => {
  keyList[e.keyCode] = false;
  playerMove();
});

function playerMove() {
  for (let k in keyList) {
    if (keyList[k] === true) {
      switch(k) {
        case "38":
          player.y -= playerSpeed; break;
        case "40":
          player.y += playerSpeed; break;
        case "37":
          player.x -= playerSpeed; break;
        case "39":
          player.x += playerSpeed; break;
      }
    }
  }
}
