var cookies = [];
var total = 1500;
var isDown = false;
var multipler = 0;
var q = null;
var isReady = false;

function init() {
  var manifest = [
    {id:"title",src:"images/Title.png"},
    {id:"oreo",src:"images/Oreo.png"}
  ]
  q = new createjs.LoadQueue(true);
  q.on("complete", assetLoaded);
  q.loadManifest(manifest);
}

function assetLoaded() {
  canvas = document.getElementById("test");

  stage = new createjs.StageGL(canvas);
  stage.addEventListener("stagemousedown", handleDown);
  stage.addEventListener("stagemouseup", handleUp);
  stage.setClearColor("#4ACFF1");

  createjs.Touch.enable(stage);

  window.addEventListener('resize', onResize);

  title = new createjs.Bitmap(q.getResult('title'));
  stage.addChild(title);
  stage.update();

  onResize();
  buildCookies();
  setTimeout(function () {
    isReady = true;
  }, 1000)

}

function handleDown() {
  isDown = true;
}

function handleUp() {
  isDown = false;
  multipler = 0;
}

function updatePower() {
  if (isDown) {
    multipler =  Math.min(1, multipler+0.03);
  }
}

function buildCookies() {
  var cookie;
  for(var i=0;i<total;i++) {
    cookie = new createjs.Bitmap(q.getResult('oreo'));
    cookie.x = Rnd(-100,canvas.width);
    cookie.scale= .1+Math.random()*.5;
    cookie.y = Rnd(-1500, -300);
    cookie.speedY = Rnd(4, 10);
    cookies.push(cookie);
    stage.addChild(cookie);
  }

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", tick);

}

function onResize(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var scale = Math.min(this.stage.canvas.width, this.stage.canvas.height)/720;

  title.scale = Math.min(1,scale);
  title.x = canvas.width - (title.image.width*title.scale) >> 1;
  title.y = canvas.height - (title.image.height*title.scale) >> 1;

  stage.updateViewport(canvas.width, canvas.height);
}

function avoid(event) {
  maxStrength = 750*multipler;
  var l = cookies.length;
  for(var i=0;i<l;i++) {
    var cookie = cookies[i];
    var dx = cookie.x - stage.mouseX;
    var dy = cookie.y - stage.mouseY;
    var angle = Math.atan2(dy, dx);
    var dis = Math.sqrt(dx*dx+dy*dy);
    var f = maxStrength / dis*2;
    cookie.x += Math.cos(angle) * f;
    cookie.y += Math.sin(angle) * f *2;
  }
}

function move() {
  var l = cookies.length;
  for(var i=0;i<l;i++) {
    var cookie = cookies[i];
    cookie.y += cookie.speedY;
    if (cookie.y > canvas.height) {
      cookie.x = Rnd(-100,canvas.width);
      cookie.y = Rnd(-200, -100);
      cookie.speedY = Rnd(4, 10);
    }
  }
}

function tick(event) {
  if (isReady === true) {
    updatePower();
    avoid();
    move();
  }

  stage.update(event);
}
init();
