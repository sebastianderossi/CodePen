var canvas, stage;
var w = 1280;
var h = 720;
var hue = 90;
var firstHit = false;
var flakes = [];
var slow = 0.5;
var normal = 1;
var fast = 3;
var left = 2;
var none = 0;
var right = -2;

function loadTitle() {
  titleImage = new Image();
  titleImage.onload = handleImageLoad;
  titleImage.src = "images/HappyHolidays_copy.png";

  clickImage = new Image();
  clickImage.onload = handleImage2Load;
  clickImage.src = "images/ClickForMusic.png";
}

function handleImage2Load() {
  addClick();
}

function handleImageLoad() {
  addTitle();
}

function init() {

  canvas = document.getElementById("canvas");
  stage = new createjs.Stage(canvas);

  loadTitle();

  createjs.Touch.enable(stage);

  comp = AdobeAn.getComposition("8634CACDC05B41C88950407E026932DA");
  lib = comp.getLibrary();

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  background = new createjs.Shape();
  background.graphics.clear().lf(["#0099D2", "#0079C1"], [0,1],0,0,canvas.width,0).dr(0, 0, canvas.width,canvas.height);
  background.width = canvas.width;
  background.height = canvas.height;
  background.cache(0, 0, background.width, background.height);

  scale = Math.min(canvas.width, canvas.height)/h;
  stage.addChild(background);

  logo = new lib.ATBLogo();

  logo.scaleX = logo.scaleY = scale;
  logo.width = 722 * scale;
  logo.height = 381 * scale;
  logo.x = canvas.width - logo.width >> 1;
  logo.y = canvas.height - logo.height >>1;

  snowman = new lib.Snowman();
  snowman.width = 188 * scale;
  snowman.height = 282 * scale;
  snowman.scaleX = snowman.scaleY = scale;
  snowman.framerate = 17;
  snowman.x = logo.x + logo.width;
  snowman.y = (logo.y + logo.height) - (snowman.height/2);

  tree = new lib.Tree();
  tree.width = 197 * scale;
  tree.height = 308 * scale;
  tree.scaleX = tree.scaleY = scale;
  tree.x = logo.x - tree.width/2;
  tree.y = snowman.y + tree.height/2;

  ground = new createjs.Shape();
  groundImg = new createjs.Shape();
  groundImg.graphics.f("#FEFAF6").dr(0, 0, 5, canvas.height>>1);
  groundImg.width = 5;
  groundImg.height = canvas.height>>1;
  groundImg.cache(0, 0, 5, canvas.height>>1);
  ground.graphics.beginBitmapFill(groundImg.cacheCanvas).drawRect(0, 0, canvas.width + groundImg.width, groundImg.height);
  ground.y = logo.y + logo.height - (35*scale);

  hill = new createjs.Shape();
  hill2 = new createjs.Shape();
  hill.graphics.beginFill("#FEFAF6")
    .beginStroke().moveTo(-187.4,19)
    .curveTo(-112.6,1.2,-85.5,3.6).curveTo(-35.8,7.8,1.2,7.8)
    .curveTo(44.1,8,84.7,2.9).curveTo(127.9,-2.5,176.5,-14.9)
    .lineTo(187.3,-19).lineTo(187.4,19).closePath();
  hill.setTransform(0,0,2.904,1.053);

  hill.height = 40;
  hill.width = 1088;
  hill.x = canvas.width - (hill.width/2);
  hill.y = 2 + ground.y - hill.height/2;
  hill.cache(-hill.width/2, -hill.height/2, hill.width, hill.height);

  hill2.graphics.beginFill("#CFCCCD").
  beginStroke().moveTo(-309.4,22.3)
    .lineTo(-309.4,8.7)
    .curveTo(-279.4,2.2,-266.2,-0.4)
    .curveTo(-184.7,-16.7,-119.2,-19.2)
    .curveTo(-53.7,-21.7,-22.5,-22.3)
    .curveTo(8.7,-22.8,98.6,-10.2)
    .curveTo(147.2,2.1,190.4,7.5)
    .curveTo(204.8,9.4,219.4,10.5).lineTo(224.6,10.9)
    .curveTo(248.8,12.6,264,12.7)
    .curveTo(279.1,12.8,285,14.4).lineTo(288.4,15.4)
    .curveTo(295.2,17.5,309.4,22.3).closePath();


  hill2.height = 44;
  hill2.width = 618;
  hill2.x = (hill2.width/2);
  hill2.y = 2 + ground.y - hill2.height/2;
  hill2.cache(-hill2.width/2, -hill2.height/2, hill2.width, hill2.height);
  ground.alpha = 1;

  snowField = createSnowFlakes(150, none, slow, 0.5, 0.5);
  snowField1 = createSnowFlakes(75, none, fast, 0.5, 0.9, "#ebebeb");

  stage.addChild(snowField);
  stage.addChild(hill2, ground, hill, logo, snowman, tree);
  stage.addChild(snowField1);

  updataColors(createjs.Graphics.getHSL(hue, 100, Math.min(60, 50)) , 1);

  tree.star.scaleX = tree.star.scaleY = 1;
  isReady = false;
  fakeLights = false;
  index = 0;
  setTimeout(function () {
    jam = new JustAddMusic({
      src: "sounds/musicJiggle.mp3",
      ui:false,
      onstart:function () {
        readyToJam();
      },
      onended:function () {
        updataColors(createjs.Graphics.getHSL(hue, 100, Math.min(60, 50)) , 1);
        tree.star.scaleX = tree.star.scaleY = 1;
        createjs.Tween.removeTweens(snowman.rightArm);
        createjs.Tween.removeTweens(snowman.leftArm);
        snowman.face.gotoAndStop(0);
        isReady = false;
      },
      ontick: function(o) {
        if (isReady === false) {return; }
        var l = Math.round(o.all.val * 100);
        if (o.mid.hit) {
          hue = (hue+100)%360;
          if (firstHit === false) {
            snowman.face.gotoAndPlay("dance");
            moveArms();
          }
          firstHit = true;
        }
        var color = createjs.Graphics.getHSL(hue, 100, Math.min(60, l));
        updataColors(color, l/50);
        updateTree(l);
      }
    });
  }, 100);

  createjs.Ticker.framerate = 30;
  createjs.Ticker.on("tick", tick);
  window.addEventListener("resize", handleResize)
}

function readyToJam() {
    if (typeof window.orientation !== 'undefined') {
       createjs.Tween.get(clickTitle).to({alpha:1}, 1000);
        createjs.Tween.get(clickTitle).to({x:title.posX}, 500);
       stage.addEventListener("stagemousedown", handleDown);
    }
    else {
      startMusic();
    }
}

function handleDown(event) {
  startMusic();
  clickTitle.alpha = 0;
  event.remove();
}

function startMusic() {
  createjs.Tween.get(title).to({alpha:1}, 1000);
  createjs.Tween.get(title).to({x:title.posX}, 500);
  isReady = true;
  jam.play();
}

function addTitle() {
  title = new createjs.Bitmap(titleImage);
  title.width = 432*Math.min(scale, 1);
  title.height = 100*Math.min(scale, 1);
  title.x = logo.x - (title.width/4);
  title.y = logo.y - title.height/2;
  title.posX = title.x;
  title.x -= 50;
  title.scaleX = title.scaleY = Math.min(scale, 1);
  title.alpha = 0;

  stage.addChildAt(title,stage.numChildren - 2);
}

function addClick() {
  clickTitle = new createjs.Bitmap(clickImage);
  clickTitle.width = 395*Math.min(scale, 1);
  clickTitle.height = 100*Math.min(scale, 1);
  clickTitle.x = logo.x - (title.width/4);
  clickTitle.y = logo.y - title.height/2;
  clickTitle.posX = clickTitle.x;
  clickTitle.x -= 50;
  clickTitle.scaleX = clickTitle.scaleY = Math.min(scale, 1);
  clickTitle.alpha = 0;

  stage.addChildAt(clickTitle,stage.numChildren);
}

function updateTree(scale) {
  var l = 5;
  tree.star.scaleX = tree.star.scaleY = 0.5 + (scale/100);
  for(var i=1;i<=l;i++) {
    var ball = tree['ball'+i];
    ball.scaleX = ball.scaleY = 0.5 + (scale/100)
  }
}

function updateSnow() {
  var l = flakes.length;
  for(var i=0;i<l;i++) {
    var flake = flakes[i];
    flake.rad += (flake.k / 180) * Math.PI;
    flake.x -= Math.cos(flake.rad)+flake.wind;
    flake.y += flake.speed;
    if (flake.y >= canvas.height) {
      flake.y = -15;
    }
    if (flake.x >= canvas.width) {
      flake.x = 1
    }
    if (flake.x <= 0){
      flake.x = canvas.width - 1;
    }
  }
}

function createSnowFlakes(total, wind, speed, min, max, color) {
  var container = new createjs.Container();
  color = color || "#FFFFFF";
  for(var i=0;i<total;i++) {
    var flake = getSprite(4, 4, color);
    flake.r = 1+Math.random()*speed;
    flake.k = -Math.PI+Math.random()*Math.PI;
    flake.rad = 0;
    flake.speed = speed;
    flake.wind = wind;
    flake.scaleX = flake.scaleY = min + Math.random()*max;
    flake.alpha = .5+Math.random()*1;
    flake.x = Math.random()*canvas.width;
    flake.y = Math.random()*canvas.height;
    container.addChild(flake);
    flakes.push(flake);
  }
  return container;
}

function getSprite(w, h, color) {
  var s = new createjs.Shape();
  s.width = w;
  s.height = h;
  s.graphics.f(color).dc(0, 0, w);
  s.cache(-w, -h, w*2, h*2);
  return new createjs.Bitmap(s.cacheCanvas);
}

function getRange(min, max) {
  var scale = max - min;
  return Math.random()*scale + min;
}

function moveArms() {
  var rot = getRange(-20, 45);
  createjs.Tween.get(snowman.rightArm, {override:true, bounce:true, loop:-1}).to({rotation:getRange(-20, 45)}, 300);
  createjs.Tween.get(snowman.leftArm, {override:true, bounce:true, loop:-1}).to({rotation:getRange(-20, 45)}, 300);
}

function updataColors(color, alpha) {
  if (color == null) { return; }
  var l = logo.numChildren;
  for(var i=0;i<l;i++) {
    var clip = logo.getChildAt(i);
    if (clip.name != null) {
      updateLight(clip, color, alpha);
    }
  }
}

function updateLight(light, color, alpha) {
  var instructions = light.shape.graphics.instructions;
  light.shape.scaleX = light.shape.scaleY = alpha;
  light.shape.alpha = alpha;

  var lastInstr = instructions[instructions.length-1];
  lastInstr.radialGradient([color, "rgba(255,255,255,0)"],[0,1],0,0,0,0,0,34/2);
  var inner = light.light.shape_1;
  inner.graphics._fill.style=color;
}

function handleResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  background.width = canvas.width;
  background.height = canvas.height;
  scale  = Math.min(canvas.width, canvas.height)/h;

  background.uncache();
  background.graphics.clear().lf(["#0099D2", "#0079C1"], [0,1],0,0,canvas.width,0).dr(0, 0, canvas.width,canvas.height);
  background.cache(0, 0, background.width, background.height);

  logo.scaleX = logo.scaleY = scale;
  logo.width = 722 * scale;
  logo.height = 381 * scale;
  logo.x = canvas.width - logo.width >> 1;
  logo.y = canvas.height - logo.height >>1;

  snowman.width = 188 * scale;
  snowman.height = 282 * scale;
  snowman.scaleX = snowman.scaleY = scale;
  snowman.x = logo.x + logo.width;
  snowman.y = (logo.y + logo.height) - (snowman.height/2);

  tree.width = 197 * scale;
  tree.height = 308 * scale;
  tree.scaleX = tree.scaleY = scale;
  tree.x = logo.x - tree.width/2;
  tree.y = snowman.y + tree.height/2;

  groundImg.graphics.clear().f("#FEFAF6").dr(0, 0, 5, canvas.height>>1);
  groundImg.width = 5;
  groundImg.height = canvas.height>>1;
  groundImg.uncache();
  groundImg.cache(0, 0, 5, canvas.height>>1);
  ground.graphics.clear().beginBitmapFill(groundImg.cacheCanvas).drawRect(0, 0, canvas.width + groundImg.width, groundImg.height);
  ground.y = logo.y + logo.height - (35*scale);

  hill.uncache();
  hill.graphics.clear().beginFill("#FEFAF6")
    .beginStroke().moveTo(-187.4,19)
    .curveTo(-112.6,1.2,-85.5,3.6).curveTo(-35.8,7.8,1.2,7.8)
    .curveTo(44.1,8,84.7,2.9).curveTo(127.9,-2.5,176.5,-14.9)
    .lineTo(187.3,-19).lineTo(187.4,19).closePath();
  hill.setTransform(0,0,2.904,1.053);

  hill.height = 40;
  hill.width = 1088;
  hill.x = canvas.width - (hill.width/2);
  hill.y = 2 + ground.y - hill.height/2;
  hill.cache(-hill.width/2, -hill.height/2, hill.width, hill.height);

  title.width = 432*Math.min(scale, 1);
  title.height = 100*Math.min(scale, 1);
  title.x = logo.x - (title.width/4);
  title.y = logo.y - title.height/2
  title.scaleX = title.scaleY = Math.min(scale, 1);

  hill2.uncache();
  hill2.graphics.clear().beginFill("#CFCCCD").
  beginStroke().moveTo(-309.4,22.3)
    .lineTo(-309.4,8.7)
    .curveTo(-279.4,2.2,-266.2,-0.4)
    .curveTo(-184.7,-16.7,-119.2,-19.2)
    .curveTo(-53.7,-21.7,-22.5,-22.3)
    .curveTo(8.7,-22.8,98.6,-10.2)
    .curveTo(147.2,2.1,190.4,7.5)
    .curveTo(204.8,9.4,219.4,10.5).lineTo(224.6,10.9)
    .curveTo(248.8,12.6,264,12.7)
    .curveTo(279.1,12.8,285,14.4).lineTo(288.4,15.4)
    .curveTo(295.2,17.5,309.4,22.3).closePath();


  hill2.height = 44;
  hill2.width = 618;
  hill2.x = (hill2.width/2);
  hill2.y = 0 + ground.y - hill2.height/2;

  hill2.cache(-hill2.width/2, -hill2.height/2, hill2.width, hill2.height);


  for(var i=0;i<flakes.length;i++) {
    var flake = flakes[i];
    flake.x = Math.random()*canvas.width;
    flake.y = Math.random()*canvas.height;
  }

  stage.update(lastEvent);
}
var lastEvent;
function tick(event) {
  lastEvent = event;
  updateSnow();
  stage.update(event);
}

init();
