var canvas, stage, exportRoot;
var w = 1280;
var h = 720;
var helloW = 927;
var helloH = 275;
var allTweens = [];

function init() {
	help = document.getElementById("help");
	help.addEventListener("click", showInstruction);
	canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	stage = new createjs.Stage(canvas);

	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	createjs.Ticker.on("tick", stage);

	start();
}

function showInstruction() {
	var cursor = new CursorClick(stage);
	help.removeEventListener("click", showInstruction);
	stage.framerate = 31;
	cursor.on("animationComplete", function () {
		stage.removeChild(cursor);
		help.addEventListener("click", showInstruction);
	});
	stage.addChild(cursor)
}

function start() {
	exportRoot = new lib.Text2();

	createjs.Touch.enable(stage);
	stage.addChild(exportRoot);
	stage.update();

	hello = exportRoot.hello;

	stage.on("stagemousedown", handleClick, this);

	container = new createjs.Container();
	exportRoot.addChild(container);

	createjs.Ticker.timingMode = createjs.Ticker.RAF;

	handleResize();
	window.addEventListener("resize", handleResize);

	handleClick();
}

function handleClick() {
	max = 0;
	container.removeAllChildren();
	var l = allTweens.length;
	for(var i=0;i<l;i++) {
		var t = allTweens[i];
		createjs.Tween.removeTweens(t);
	}
	allTweens = [];

	hue = getRange(0, 336) | 0;
	sat = 100;
	light = getRange(20, 80) | 0;
	canvas.style.backgroundColor = createjs.Graphics.getHSL(hue, sat, light);

	mapClip(hello.letter1, getRange(60, 190)| 0, {width:181, height:266});
	mapClip(hello.letter2, getRange(60, 190)| 0, {width:161, height:266});
	mapClip(hello.letter3, getRange(60, 150)| 0, {width:155, height:266});
	mapClip(hello.letter4, getRange(60, 150)| 0, {width:155, height:266});
	mapClip(hello.letter5, getRange(60, 170)| 0, {width:190, height:275});
}

function handleResize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	scale = Math.min(canvas.width, canvas.height)/720;

	exportRoot.scaleX = exportRoot.scaleY = scale;
	exportRoot.regX = 1024/2;
	exportRoot.regY = 600/2;
	exportRoot.x = canvas.width>>1;
	exportRoot.y = canvas.height>>1;
	stage.update(lastEvent);
}

function mapClip(clip, total, area) {
	ball = getSprite(10);
	for(var i=0;i<total;i++) {
		var pt = clip.localToGlobal(0, 0);
		var pt1 = exportRoot.globalToLocal(pt.x, pt.y);
		var _x = Math.random()*area.width | 0;
		var _y = Math.random()*area.height | 0;
		if (clip.hitTest(_x, _y)) {
			var _ball = ball.clone();
			var scale = getRange(.8,2);
			_ball.x = pt1.x+(_x*hello.scaleX);
			_ball.y = pt1.y+(_y*hello.scaleX);
			_ball.scaleX = _ball.scaleY = 0;
			var t = createjs.Tween.get(_ball, {onComplete:function () {
				if (++max == container.numChildren) {
					var t2 = createjs.Tween.get(this).wait(2000).call(function () {
						handleClick();
						allTweens.push(t2);
					})
				}
			}}).wait((i+1)*20).to({scaleX:scale, scaleY:scale}, 200 + Math.random()*200 | 0, createjs.Ease.backOut);
			allTweens.push(t);
			container.addChild(_ball);
		}
	}
}

function getRange(min, max) {
	var scale = max - min;
	return Math.random()*scale + min;
}

function getSprite(r) {
	var s = new createjs.Shape();
	var _hue = getRange(hue-25, hue+25) | 0;
	//var sat = 0;
	var light = getRange(20, 80) | 0;
	var baseColor = createjs.Graphics.getHSL(_hue, sat, light);
	var color = createjs.Graphics.getHSL(_hue, sat, light-(5+Math.random()*10));
	var strokeColor = createjs.Graphics.getHSL(_hue, sat, light-(5+Math.random()*10));
	s.graphics.s(strokeColor)
			.ss(2, 0, 0, 0, true)
			.f(baseColor)
			.dc(0,0,r)
			.s(strokeColor)
			.ss(2, 0, 0, 0, true)
			.f(color).dc(0,0,r/2);
	s.cache(-r/2, -r/2, r, r);
	return s;
}

var lastEvent;
function onTick(event) {
	lastEvent = event;
	stage.update(event);
}

init();
