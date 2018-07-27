var canvas, stage;
var w = 888;
var h = 488;
var paused = true;
var val = 0;
var sot = null;
var data = {};
var displayScore=0;

var scanLineImage;

function loadAsset() {
  scanLineImage = new Image();
  scanLineImage.src = "./assets/scanlines1.png";
  scanLineImage.crossOrigin = "Anonymous";
  scanLineImage.onload= init.bind(this);

  loadFont();
  loadSound();
}

function loadSound() {
  var  manifest = [
    {src:"./assets/sot.mp3",id:"sot"}
  ]
  lq = new createjs.LoadQueue(true);
  lq.installPlugin(createjs.Sound);
  lq.addEventListener("complete", handleSoundComplete);
  lq.loadManifest(manifest, true);
}

function handleSoundComplete() {
  sot = createjs.Sound.play("sot", {loop:-1});
  sot.stop();
  paused = false;
}

function loadFont() {
  data = {
    "images": [
      "./assets/Fonts_atlas_.png"
    ],
    "framerate": 20,
    "frames": [
      [0, 0, 82, 43],
      [0, 135, 24, 42],
      [84, 45, 79, 43],
      [84, 0, 80, 43],
      [0, 90, 80, 43],
      [82, 90, 80, 43],
      [0, 45, 82, 43],
      [166, 0, 79, 43],
      [164, 90, 79, 43],
      [165, 45, 79, 43]
    ],
    "animations": {
      "0": {"frames": [0]},
      "1": {"frames": [1]},
      "2": {"frames": [2]},
      "3": {"frames": [3]},
      "4": {"frames": [4]},
      "5": {"frames": [5]},
      "6": {"frames": [6]},
      "7": {"frames": [7]},
      "8": {"frames": [8]},
      "9": {"frames": [9]}

    }
  }
  var ss = new createjs.SpriteSheet(data);
  text = new createjs.BitmapText("000000", ss);
  text.scale = .55;
}

function paddy(n, p, c) {
  var pad_char = typeof c !== 'undefined' ? c : '0';
  var pad = new Array(1 + p).join(pad_char);
  return (pad + n).slice(-pad.length);
}

function init() {
  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  createjs.Ticker.timingMode = createjs.Ticker.RAF;
  createjs.Ticker.on("tick", onTick);

  window.addEventListener('resize', handleResize);

  createView();
}

function createView() {
  displayScore = 9999;
  createjs.Tween.get(this, {onChange:function () {
    text.text = paddy(displayScore | 0, 6)+"";
  }}).to({displayScore:0}, 3000);

  if (sot != null ){
    sot.play();
  }
  paused = false;
  container = new createjs.Container();
  wall1 = getWallLines(20, 20, stage.canvas.width, "#bdba2c");
  wall2 = getWallLines(20, 20, stage.canvas.width, "#bdba2c");

  viewPort = getViewPort(w, h, 20, 10);
  mask = new createjs.Shape();
  mask.width = w;
  mask.height = h;
  mask.graphics.ss(10).s("#bdba2c").f("#bdba2c").drawRoundRect(0, 0, w, h, 20);

  wall1.rotation = 110;
  wall2.rotation = -70;

  redLine = new createjs.Shape();
  redLine.graphics.f("#c8341c").dr(0, 0, 10, stage.canvas.height);

  redLine2 = new createjs.Shape();
  redLine2.graphics.f("#c8341c").dr(0, 0, 10, stage.canvas.height);
  redLine2.x = stage.canvas.width-10;

  boxContainer = new createjs.Container();

  container.addChild(wall1,wall2);
  var startW = 10;
  var startH = 12;
  scanLines = new createjs.Shape();
  boxes = [];
  var speed = 6;
  var focalDistance = 250;
  total = 20;
  var box = getTargetWall(startW, startH, 3);
  box.z = 2000*(total);
  box.velZ = -(15)*(speed+0.01)*4;
  var p = focalDistance/box.z;
  box.regX = box.width>>1;
  box.regY = box.height>>1;
  box.scaleX = (p*10)*(0)*1.85;
  box.scaleY = (p*10)*(0)*1.85;
  box.x = stage.canvas.width>>1;
  box.y = stage.canvas.height>>1;

  boxes.push(box);
  boxContainer.addChild(box);

  for(var i=0;i<total;i++) {
    box = wallDecoration(startW, startH, 3);
    box.z = 2000*((total-(i+1)));
    box.velZ = -(15)*(speed+0.01)*4;
    var p = focalDistance/box.z;
    box.regX = box.width>>1;
    box.regY = box.height>>1;
    box.scaleX = (p*100)*(i+1)*1.85;
    box.scaleY = (p*100)*(i+1)*1.85;
    box.x = stage.canvas.width>>1;
    box.y = stage.canvas.height>>1;
    boxes.push(box);
    boxContainer.addChild(box);
  }

  container.addChild(boxContainer, redLine, redLine2, viewPort);
  scanLines.graphics.beginBitmapFill(scanLineImage).drawRect(0,0,stage.canvas.width+1,stage.canvas.height+1);

  wall1.x = wall2.x = stage.canvas.width>>1;
  wall1.y = wall2.y = stage.canvas.height>>1;

  viewPort.x = stage.canvas.width - viewPort.width >>1;
  viewPort.y = stage.canvas.height - viewPort.height >>1;

  mask.x = stage.canvas.width - viewPort.width >>1;
  mask.y = stage.canvas.height - viewPort.height >>1;
  container.mask = mask;
  scanLines.alpha = 0.65;

  layout = getViewPort(w/3, h/6, 10, 5, "#FF0099");

  display = new createjs.Container();
  display.x = viewPort.x+ (viewPort.width - layout.width >>1);
  display.y = viewPort.y+ viewPort.height - layout.height/2;
  text.x = 15;
  text.y =30;
  display.addChild(layout, text);
  stage.addChild(container, display, scanLines);
  handleResize()
}

function handleResize(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  targetX = viewPort.x;
  targetX2 = viewPort.x + viewPort.width;

  var iw = window.innerWidth;
  var ih = window.innerHeight;
  var xRatio=iw/w;
  var yRatio=ih/h;
  var sRatio=1;

  if (w > h) {
    sRatio = Math.min(xRatio, yRatio);
  }else {
    sRatio = Math.min(yRatio, xRatio);
  }

  var l = boxContainer.numChildren;
  for(var i=0;i<l;i++) {
    var box = boxContainer.getChildAt(i);
    box.x = stage.canvas.width>>1;
    box.y = stage.canvas.height>>1;
    box.scale = sRatio;
  }

  redLine.graphics.clear().f("#c8341c").dr(0, 0, 10, stage.canvas.height);
  redLine2.graphics.clear().f("#c8341c").dr(0, 0, 10, stage.canvas.height);
  redLine.cache(0, 0, 10, stage.canvas.height);
  redLine2.cache(0, 0, 10, stage.canvas.height);

  wall1.x = wall2.x = stage.canvas.width>>1;
  wall1.y = wall2.y = stage.canvas.height>>1;
  viewPort.x = mask.x = stage.canvas.width - (viewPort.width*viewPort.scale) >>1;
  viewPort.y = mask.y = stage.canvas.height - (viewPort.height*viewPort.scale) >>1;

  scanLines.graphics.clear().beginBitmapFill(scanLineImage).drawRect(0,0,stage.canvas.width+1,stage.canvas.height+1);
  scanLines.cache(0,0,stage.canvas.width+1,stage.canvas.height+1);

  display.x = viewPort.x+ (viewPort.width - layout.width >>1);
  display.y = viewPort.y+ viewPort.height - layout.height/2;

  stage.update();
}

function getTargetWall(w, h, thickness) {
  var s = new createjs.Shape();
  s.width = w;
  s.height = h;

  s.graphics.ss(thickness, 0, 0, 10, true).s("#bdba2c").f("#000000")
    .dr(0, 0, w, h);
  s.graphics.mt(w/2, 0)
    .lt(w/2, h)
    .mt(0,h/2)
    .lt(w,h/2)
    .de(2, 2, 6, 8);
  return s;
}

function updateGrid() {
  var focalDistance = 250;
  var l = boxContainer.numChildren;
  var box;
  redLine.x += (targetX - redLine.x)*.1;
  redLine2.x += (targetX2 - redLine2.x)*.1;

  for(var i=0;i<l;i++) {

    box = boxes[i];
    box.z += box.velZ;
    var p = focalDistance/box.z;
    box.scale = (p*100)*(i+0.5)*1.85;
    box.x = stage.canvas.width>>1;
    box.y = stage.canvas.height>>1;
    if (i % (total) == 0) {
      targetX =viewPort.x+ (stage.canvas.width*2) * (p*20)*.09;
      targetX2 =viewPort.x+ viewPort.width + (-stage.canvas.width*2) * (p*20) *.1
    }
    if (box.z < 380 ) {
      if (i == 0) {
        paused = true;
        sot.stop();
        redLine.visible = false;
        redLine2.visible = false;
        showTarget();
      }else {
        box.parent.removeChild(box);
      }
    }
  }
}

function showTarget() {
  var s = new createjs.Shape();
  s.graphics.ss(10, 0, 0, 10, true).s("#c8341c")
    .mt(w/2, 0)
    .lt(w/2, h)
    .mt(0,h/2)
    .lt(w,h/2);
  s.x = viewPort.x;
  s.y = viewPort.y;

  var l = 8;
  var radius = 110;
  var degreeStep = 360 / l;
  var arrowW = 25;
  var arrowH = 100;
  for(var i=0;i<l;i++) {
    var deg = -(i * degreeStep);
    var arrow = new createjs.Shape();
    arrow.graphics.f("#c8341c")
      .mt(0,0)
      .lt(-arrowW,arrowH)
      .lt(arrowW,arrowH)
      .lt(0,0);
    arrow.regX = 0;
    arrow.regY = 0;
    arrow.x = stage.canvas.width/2 + Math.cos(deg*Math.PI/180)*radius;
    arrow.y = stage.canvas.height/2 + Math.sin(deg*Math.PI/180)*radius;
    if (i%2 === 0) {
      arrow.visible = false;
    }

    var dx = stage.canvas.width/2 - arrow.x;
    var dy = stage.canvas.height/2 - arrow.y;
    var a = Math.atan2(dy, dx) *180/Math.PI + 90;
    arrow.rotation = a;
    createjs.Tween.get(arrow, {loop:4}).to({alpha:0}, 200).to({alpha:1}, 100);
    stage.addChild(arrow)
  }
  createjs.Tween.get(s, {loop:4, onComplete:function () {
    reset();
  }}).to({alpha:0}, 100).to({alpha:1}, 50);

  stage.addChildAt(s,1);
}

function reset() {
  createjs.Tween.removeAllTweens();
  stage.removeAllChildren();

  createView();
}

function wallDecoration(w, h, thickness) {
  var s = new createjs.Shape();
  s.width = w;
  s.height = h;
  s.graphics.ss(thickness, 0, 0, 10, true).s("#bdba2c")
    .mt(0,0).lt(0, h).lt(w,h).lt(w, 0);
  return s;
}

function getViewPort(w, h, radius, thickness, fillColor) {
  var fillColor = null || fillColor;
  var s = new createjs.Shape();
  s.width = w;
  s.height = h;
  if (fillColor ==  null) {
    s.graphics.ss(thickness, 0, 0, 10, true).s("#bdba2c").drawRoundRect(0, 0, w, h,radius);
  }else {
    s.graphics.f("#000000").ss(thickness, 0, 0, 10, true).s("#bdba2c").drawRoundRect(0, 0, w, h,radius);
  }

  return s;
}

function getWallLines(startAngle, inc, length, color) {
  var s = new createjs.Shape();
  for(var i=0;i<6;i++) {
    var _x = Math.cos(startAngle*Math.PI/180) * length;
    var _y = Math.sin(startAngle*Math.PI/180) * length;
    s.graphics.ss(3).s(color).mt(0, 0).lt(_x, _y);
    startAngle+=inc;
  }
  return s;
}

function onTick(event) {
  if (paused == false) {
    updateGrid();
  }
  stage.update(event);
}
loadAsset();
