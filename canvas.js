$( document ).ready(function() {
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Create gradient
var grd = ctx.createRadialGradient(75,50,5,90,60,100);
grd.addColorStop(0, "red");
grd.addColorStop(1, "blue");

var Point = function(x, y) {
  this.x = x;
  this.y = y;
};

var width = 200, height = 300;

var keyList = {};
var player = new Point(width/2, height/2);
var enemies = [];
var alive = true;

for (var i=0; i<20; i++) {
  var enemy = new Point(Math.random() * width, Math.random() * height - height)
  enemies.push(enemy);
}

function drawPlayer() {
  ctx.fillStyle = grd;
  ctx.fillRect(player.x-5, player.y-5, 10, 10);
}
 
function drawEnemy() {
  ctx.fillStyle = "black";
  enemies.forEach(function(enemy) {
    enemy.y = (enemy.y + 1) % height;
    ctx.fillRect(enemy.x-5, enemy.y-5, 10, 10);
    
    if (Math.abs(player.x - enemy.x) < 10 && Math.abs(player.y - enemy.y) < 10) {
      alive = false;
    }
  });
}

function clear() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
}

function run() {
  clear();
  drawEnemy();
  if (alive === true) {
    drawPlayer();
  }
}

$("#btn").click(function(){
  setInterval(run, 20);
  alive = true;
});


/* 
多个方向键同时响应
http://www.fengfly.com/plus/view-40190-1.html
*/
$(document).keydown(function(e) {
  keyList[e.keyCode] = true;
  playerMove();
});

$(document).keyup(function(e) {
  keyList[e.keyCode] = false;
  playerMove();
});

function playerMove() {
  for (var k in keyList) {
    if (keyList[k] === true) {
      switch(k) {
        case "38":
          player.y -= 2; break;
        case "40":
          player.y += 2; break;
        case "37":
          player.x -= 2; break;
        case "39":
          player.x += 2; break;
      }
    }
  }
}

});
